# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@1punch.io'
  layout 'mailer'
end
