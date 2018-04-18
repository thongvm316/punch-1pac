# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  attributes :id, :activitable, :activitable_id, :activitable_type, :kind, :created_at
  belongs_to :user, serializer: UserSerializer

  def activitable
    if object.activitable_type == 'Request'
      activitable = Request.find_by(id: object.activitable_id)
      ActiveModelSerializers::SerializableResource.new(activitable, serializer: RequestSerializer).as_json
    elsif object.activitable_type == 'Attendance'
      activitable = Attendance.find_by(id: object.activitable_id)
      ActiveModelSerializers::SerializableResource.new(activitable, serializer: AttendanceSerializer).as_json
    end
  end

  def created_at
    object.created_at.iso8601
  end
end
