# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  include SendGrid
  layout 'mailer'

  def sendgrid_mail(params = {})
    params.keys.each { |key| instance_variable_set(:"@#{key}", params[key]) }

    from = Email.new(email: 'no-reply@punch.ooo')
    to = Email.new(email: params[:user].email)

    file_template = File.read(Rails.root.join('app', 'views', (params[:classname]).to_s, "#{params[:filename]}.text.erb"))
    content = Content.new(type: 'text/plain', value: ERB.new(file_template).result(binding))
    sg_mail = Mail.new(from, params[:subject], to, content)

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'], host: 'https://api.sendgrid.com')
    sg.client.mail._('send').post(request_body: sg_mail.to_json)
  end
end
