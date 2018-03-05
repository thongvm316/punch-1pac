# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'associations' do
    it { should have_many(:users).dependent(:destroy) }
    it { should have_many(:allowed_ips).dependent(:destroy) }
    it { should have_many(:business_days).dependent(:destroy) }
    it { should have_many(:holidays) }
    it { should have_many(:groups) }
  end

  describe 'validations' do
    subject { build :company }
    it { should validate_presence_of(:namespace) }
    it { should validate_uniqueness_of(:namespace) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:country) }
    it { should validate_presence_of(:industry) }
    it { should validate_presence_of(:address) }
    it { should validate_presence_of(:phone_number) }
    it { should validate_presence_of(:breaktime) }
    it { should validate_presence_of(:breakdays) }
    it { should validate_inclusion_of(:language).in_array(%w[en ja vi]) }
  end

  describe 'Upload logo' do
    context 'when valid image' do
      let(:att) { attributes_for :company, logo: File.open(Rails.root.join('spec', 'fixtures', 'images', 'image.png')) }

      it do
        company = Company.create(att)
        expect(company.logo.storage_key).to eq('store')
        expect(company.logo.metadata['mime_type']).to eq('image/png')
      end
    end

    context 'when invalid image' do
      let(:att) { attributes_for :company, logo: File.open(Rails.root.join('spec', 'fixtures', 'files', 'valid.csv')) }

      it do
        company = Company.create(att)
        expect(company.errors.messages.keys).to eq([:logo])
      end
    end
  end
end
