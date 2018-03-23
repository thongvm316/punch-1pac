# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@buildcauhinh.com'
  layout 'mailer'
end
