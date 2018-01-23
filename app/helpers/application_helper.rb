# frozen_string_literal: true

module ApplicationHelper
  def error_message(errors, attr)
    content_tag(:p, errors.full_messages_for(attr).first, class: 'form-input-hint') if errors.messages[attr].present?
  end
end
