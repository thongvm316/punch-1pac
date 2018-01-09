# frozen_string_literal: true

require 'roo'

class UserCreateMultiForm < BaseForm
  USER_PARAMS = %w[email password password_confirmation role name gender user_permissions_attributes].freeze

  validate :validate_csv_files

  def initialize(company, csv_file)
    @uploader = CsvUploader.new(:cache)
    @file = @uploader.upload(csv_file.tempfile)
    @company = company
  end

  def save
    unless valid?
      @uploader.delete(@file)
      return false
    end
    @users = []
    @lines = []
    @permissions = load_permissions

    spreadsheet = open_spreadsheet

    (2..spreadsheet.last_row).each.with_index(1) do |item, line|
      user = @company.users.build user_params(item, spreadsheet)
      if user.save
        @users << user
      else
        @lines << line
      end
    end
    @uploader.delete(@file)
    true
  end

  def valid?
    super
    errors.empty?
  end

  def result
    {
      users: ActiveModelSerializers::SerializableResource.new(@users, each_serializer: UserSerializer).as_json,
      errors: { lines: @lines }
    }
  end

  private

  def load_permissions
    User.roles.each_with_object({}) do |(k, v), obj|
      obj[k] = Permission.select(:id).where('role <= ?', v).map { |p| { permission_id: p.id } }
    end
  end

  def user_params(item, spreadsheet)
    header = spreadsheet.row(1)
    row = Hash[[header, spreadsheet.row(item)].transpose]
    params = row.to_hash.merge(password_confirmation: row['password'])
    params[:user_permissions_attributes] = @permissions[params['role']]
    params.select { |k, v| USER_PARAMS.include?(k.to_s) && v }
  end

  def validate_csv_files
    return errors.add(:csv_file, I18n.t('errors.messages.blank')) unless @file&.present?
    return errors.add(:csv_file, I18n.t('errors.messages.blank')) unless mime_type_and_extension?
  end

  def mime_type_and_extension?
    valid_mime_types.include?(@file.mime_type) && valid_extension.include?(@file.extension)
  end

  def open_spreadsheet
    file_path = Rails.root.join(@file.storage.directory, @file.id)
    case @file.extension
    when 'csv' then Roo::CSV.new(file_path)
    when 'ods' then Roo::OpenOffice.new(file_path)
    when 'xlsx' then Roo::Excelx.new(file_path)
    end
  end

  def valid_mime_types
    ['text/plain', 'text/csv', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  end

  def valid_extension
    %w[csv ods xlsx]
  end
end
