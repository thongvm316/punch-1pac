# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserMailer, type: :mailer do
  describe '#create' do
    let(:company) { create :company }
    let(:password) { Faker::Internet.password }
    let(:user) { create :user, company: company, password: password, password_confirmation: password }
    let(:mail) { UserMailer.create(user.id, password) }

    it 'render the headers' do
      expect(mail.subject).to eq("[1Punch] Invitation from #{company.name}")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(['no-reply@1punch.io'])
    end

    it 'render the body' do
      expect(mail.body.encoded).to match("https://#{company.namespace}.1punch.io")
      expect(mail.body.encoded).to match(user.email)
      expect(mail.body.encoded).to match(password)
    end
  end
end
