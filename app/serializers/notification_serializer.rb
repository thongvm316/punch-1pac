# frozen_string_literal: true

class NotificationSerializer < ApplicationSerializer
  attributes :id, :activitable, :activitable_id, :activitable_type, :kind, :created_at
  belongs_to :user, serializer: UserSerializer

  def activitable
    data = if object.activitable_type == 'Request'
             { activitable: Request.find_by(id: object.activitable_id), serializer: RequestSerializer }
           elsif object.activitable_type == 'Attendance'
             { activitable: Attendance.find_by(id: object.activitable_id), serializer: AttendanceSerializer }
           end
    data.activitable ? ActiveModelSerializers::SerializableResource.new(data.activitable, serializer: data.serializer).as_json : nil
  end

  def created_at
    object.created_at.iso8601
  end
end
