# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  include SendGrid
  layout 'mailer'

  def sendgrid_mail(data = {})
    data.keys.each { |key| instance_variable_set(:"@#{key}", data[key]) }

    from = Email.new(email: 'no-reply@punch.ooo', name: ENV['APP_NAME'])
    to = Email.new(email: data[:user].email, name: data[:user].name)

    file_template = File.read(Rails.root.join('app', 'views', (data[:classname]).to_s, "#{data[:filename]}.text.erb"))
    content = Content.new(type: 'text/plain', value: ERB.new(file_template).result(binding))
    sg_mail = Mail.new(from, data[:subject], to, content)

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'], host: 'https://api.sendgrid.com')
    sg.client.mail._('send').post(request_body: sg_mail.to_json)
  end
end
