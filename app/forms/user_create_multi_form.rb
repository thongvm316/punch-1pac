# frozen_string_literal: true

require 'csv'

class UserCreateMultiForm < BaseForm
  USER_PARAMS = %w[email password password_confirmation role name gender user_permissions_attributes].freeze

  validate :validate_csv_files

  def initialize(company, csv_file)
    @file = csv_file.tempfile
    @company = company
  end

  def save
    return false unless valid?
    @users = []
    @lines = []
    @permissions = load_permissions
    CSV.foreach(@file.path, headers: true).with_index(1) do |row, line|
      user = @company.users.build user_params(row)
      if user.save
        @users << user
      else
        @lines << line
      end
    end
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

  def user_params(row)
    params = row.to_hash.merge(password_confirmation: row['password'])
    params[:user_permissions_attributes] = @permissions[params['role']]
    params.select { |k, v| USER_PARAMS.include?(k.to_s) && v }
  end

  def validate_csv_files
    return errors.add(:csv_file, I18n.t('errors.messages.blank')) unless @file&.present?
    return errors.add(:csv_file, I18n.t('errors.messages.blank')) unless File.extname(@file.path).casecmp('.csv').zero?
  end
end
