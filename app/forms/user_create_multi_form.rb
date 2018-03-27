# frozen_string_literal: true

class UserCreateMultiForm < BaseForm
  USER_PARAMS = %w[email password password_confirmation role name gender user_groups_attributes user_permissions_attributes].freeze
  VALID_MIME_TYPES = ['text/plain', 'text/csv'].freeze

  attribute :csv_file

  validate :validate_file_existed
  validate :validate_mine_types
  validate :validate_extensions

  def initialize(company, csv_file)
    @csv_file = csv_file.tempfile
    @company = company
  end

  def save
    return false unless valid?

    @users = []
    @lines = []
    # @permissions = load_permissions
    CSV.foreach(csv_file.path, headers: true).with_index(1) do |row, line|
      params = user_params(row.to_hash)
      user = @company.users.build(params)
      if user.save
        UserMailer.create(user.id, @company.id, params['password']).deliver_later
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
    params = row.to_hash
    params[:password] = SecureRandom.hex(10)
    params[:password_confirmation] = params[:password]
    # params[:user_permissions_attributes] = @permissions[params['role']]
    params[:user_groups_attributes] = [group_id: @company.default_group.id]
    params.select { |k, v| USER_PARAMS.include?(k.to_s) && v }
  end

  def validate_file_existed
    return errors.add(:csv_file, :blank) unless csv_file&.present?
  end

  def validate_mine_types
    cmd = `file --brief --mime-type #{csv_file.path}`
    return errors.add(:csv_file, :blank) unless VALID_MIME_TYPES.include?(cmd.strip)
  end

  def validate_extensions
    return errors.add(:csv_file, :blank) unless File.extname(csv_file) == '.csv'
  end
end
