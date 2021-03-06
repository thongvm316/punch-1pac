# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PasswordResetMailer, type: :mailer do
  describe '#create' do
    let(:company) { create :company }
    let(:user) { create :user, company: company }
    let(:mail) { PasswordResetMailer.create(user.id) }

    before { user.init_password_reset_token! }

    it 'render the headers' do
      expect(mail.subject).to eq('Please reset your password')
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["no-reply@#{ENV['APP_DOMAIN']}"])
    end

    it 'render the body' do
      expect(mail.body.encoded).to match(url_for(subdomain: company.namespace, action: 'edit', controller: 'password_reset', token: user.reset_password_token))
    end
  end
end
