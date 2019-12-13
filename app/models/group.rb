# frozen_string_literal: true

# == Schema Information
#
# Table name: groups
#
#  id          :bigint(8)        not null, primary key
#  company_id  :bigint(8)        not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#  image_data  :text
#

class Group < ApplicationRecord
  DEFAULT_NAME = 'default'

  belongs_to :company
  has_many :group_permissions, dependent: :destroy
  has_many :permissions, through: :group_permissions
  has_many :user_groups, dependent: :destroy
  has_many :users, through: :user_groups

  validates :name, presence: true

  include ImageUploader::Attachment.new(:image)

  scope :pending_requests, -> {
    select('COUNT(*) as num_pending_request', :id, :name)
      .joins(:users).merge(User.pending_requests)
      .group(:id)
  }

  def self.for_user(user)
    if %w[member admin].include?(user.role)
      where(id: UserGroup.select(:group_id).where(user: user))
    else
      all
    end
  end

  def self.create_csv(data)
    [
      data.email,
      data.name,
      data.attend_ok.to_i,
      data.attend_late.to_i,
      data.leave_ok.to_i,
      data.leave_early.to_i,
      data.annual_leave.to_i,
      "#{data.working_hours.to_i / 3600}h#{data.working_hours.to_i % 3600 / 60}m"
    ]
  end

  def self.report_csv(attendances)
    CreateCSV.header = I18n.t(['group.report.email', 'group.report.name', 'group.report.attend_ok', 'group.report.attend_late',
                               'group.report.leave_ok', 'group.report.leave_early', 'group.report.annual_leave', 'group.report.working_hours'])
    csv_data = attendances.each_with_object([]) { |v, arr| arr << create_csv(v) }
    CreateCSV.export_csv(csv_data, false)
  end

  def self.report_zip(data, date)
    compressed_filestream = Zip::OutputStream.write_buffer do |zos|
      data.each do |user|
        zos.put_next_entry "#{user.name}_#{user.email}.csv"
        attendances = user.attendances.in_period(date).order(day: :asc)
        content = User.report_csv(attendances, date)
        zos.print content
      end
    end

    compressed_filestream.rewind
    compressed_filestream.read
  end
end
