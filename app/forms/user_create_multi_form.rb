# frozen_string_literal: true

class UserCreateMultiForm < BaseForm
  USER_PARAMS = %w[email password password_confirmation role name gender user_permissions_attributes].freeze
  VALID_MIME_TYPES = [
    'text/plain',
    'text/csv',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ].freeze
  VALID_EXTENSIONS = %w[csv ods xlsx].freeze

  validate :validate_file_existed
  validate :validate_mine_types
  validate :validate_extensions

  attr_reader :file

  def initialize(company, csv_file)
    @uploader = CsvUploader.new(:cache)
    @file = @uploader.upload(csv_file.tempfile)
    @company = company
  end

  def save
    return false unless valid?

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

    true
  ensure
    @uploader.delete(@file)
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

  def validate_file_existed
    return errors.add(:csv_file, I18n.t('errors.messages.blank')) unless @file&.present?
  end

  def validate_mine_types
    return errors.add(:csv_file, I18n.t('errors.messages.invalid')) unless VALID_MIME_TYPES.include?(@file.mime_type)
  end

  def validate_extensions
    return errors.add(:csv_file, I18n.t('errors.messages.invalid')) unless VALID_EXTENSIONS.include?(@file.extension)
  end

  def open_spreadsheet
    file_path = Rails.root.join(@file.storage.directory, @file.id)
    case @file.extension
    when 'csv' then Roo::CSV.new(file_path)
    when 'ods' then Roo::OpenOffice.new(file_path)
    when 'xlsx' then Roo::Excelx.new(file_path)
    end
  end
end
