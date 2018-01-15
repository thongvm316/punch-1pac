# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PasswordResetMailer, type: :mailer do
  describe '#create' do
    let(:company) { create :company }
    let(:user) { create :user, company: company }
    let(:mail) { PasswordResetMailer.create(user.id) }

    before { user.init_password_reset_token! }

    it 'render the headers' do
      expect(mail.subject).to eq('[1Punch] Please reset your password')
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(['no-reply@1punch.io'])
    end

    it 'render the body' do
      expect(mail.body.encoded).to match("https://#{company.namespace}.1punch.io/password_reset/#{user.reset_password_token}")
    end
  end
end
