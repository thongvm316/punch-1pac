# frozen_string_literal: true

class UserCreateMultiForm < BaseForm
  USER_PARAMS = %w[email password password_confirmation role name gender].freeze
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
    CSV.foreach(csv_file.path, headers: true).with_index(1) do |row, line|
      params = user_params(row.to_hash)
      user   = @company.users.build(params)

      if user.save
        UserMailer.create(user.id, @company.id, params['password']).deliver
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

  def user_params(row)
    params = row.to_hash
    params[:password]              = SecureRandom.hex(10)
    params[:password_confirmation] = params[:password]
    params[:role]                  = row['role']&.strip&.downcase
    params[:email]                 = row['email']&.strip

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
