# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::NationalHolidaysController, type: :controller do
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
        let!(:holidays) { create_list :national_holiday, 3, country: 'en' }

        subject { get :index, params: { country: 'en' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(holidays.size) { response_holiday }) }
      end

      context 'when dont have any holidays' do
        subject { get :index, params: { country: 'en' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end
end
