# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::HolidaysController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }
  before { authenticate_user(user) }

  describe 'GET #index' do
    context 'when have holidays' do
      let!(:system_holidays) { create_list :holiday, 10, country: 'en' }

      subject { post :index, params: { country: 'en' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(10) { response_holiday }) }
    end

    context 'when dont have any holidays' do
      subject { post :index, params: { country: 'en' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array) }
    end
  end

  describe 'POST #import' do
    context 'when valid params' do
      let(:system_holidays) { create_list :holiday, 10, country: 'en' }

      subject { post :import, params: { system_holiday_ids: system_holidays.map(&:id) } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size) { response_holiday }) }
    end

    context 'when a holiday already exist' do
      let(:system_holidays) { create_list :holiday, 10, country: 'en' }

      before do
        CompanyHoliday.create(company_id: company.id, holiday_id: system_holidays.first.id)
      end
      subject { post :import, params: { system_holiday_ids: system_holidays.map(&:id) } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size - 1) { response_holiday }) }
    end

    context 'when invalid params' do
      subject { post :import, params: { system_holiday_ids: [-1, -2, -3, -4] } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as([]) }
    end
  end

  describe 'DELETE #company_destroy' do
    let(:system_holidays) { create_list(:company_holiday, 10, company: company) }

    context 'when valid' do
      subject { delete :company_destroy, params: { holiday_ids: system_holidays.select { |i| i.id.even? }.map(&:holiday_id) } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size / 2) { response_holiday }) }
    end
  end
end
