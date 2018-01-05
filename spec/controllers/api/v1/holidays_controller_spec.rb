# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::HolidaysController, type: :controller do
  let(:company) { create :company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index, params: { country: 'en' } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when have holidays' do
        let!(:system_holidays) { create_list :holiday, 3, country: 'en' }

        subject { get :index, params: { country: 'en' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size) { response_holiday }) }
      end

      context 'when dont have any holidays' do
        subject { get :index, params: { country: 'en' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end

  describe 'POST #import' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      let(:system_holidays) { create_list(:holiday, 3, country: 'en').pluck(:id) }

      subject { post :import, params: { system_holiday_ids: system_holidays } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid params' do
        let(:system_holidays) { create_list(:holiday, 3, country: 'en').pluck(:id) }

        subject { post :import, params: { system_holiday_ids: system_holidays } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size) { response_holiday }) }
      end

      context 'when a holiday already exist' do
        let(:system_holidays) { create_list(:holiday, 3, country: 'en').pluck(:id) }
        let!(:set_up) { CompanyHoliday.create(company_id: company.id, holiday_id: system_holidays.first) }

        subject { post :import, params: { system_holiday_ids: system_holidays } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size - 1) { response_holiday }) }
      end

      context 'when invalid params' do
        let!(:set_up) { create_list(:holiday, 3, country: 'en') }
        let(:last_holiday) { Holiday.last.id }

        subject { post :import, params: { system_holiday_ids: [last_holiday + 1, last_holiday + 2, last_holiday + 3] } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end

  describe 'DELETE #company_destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:system_holidays) { create_list(:company_holiday, 10, company: company) }

      subject { delete :company_destroy, params: { holiday_ids: system_holidays.select { |i| i.id.even? }.map(&:holiday_id) } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid' do
        let(:system_holidays) { create_list(:company_holiday, 10, company: company) }

        subject { delete :company_destroy, params: { holiday_ids: system_holidays.select { |i| i.id.even? }.map(&:holiday_id) } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(system_holidays.size / 2) { response_holiday }) }
      end
    end
  end
end
