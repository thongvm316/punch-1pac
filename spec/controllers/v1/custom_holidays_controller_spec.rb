# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::CustomHolidaysController, type: :controller do
  let(:company) { create :company }
  let(:user) { create :user, company: company }
  before { authenticate_user(user) }

  describe 'GET #index' do
    context 'when valid param' do
      let!(:custom_holiday_list) { create_list :custom_holiday, 2, company: company }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(custom_holiday_list.size) { response_holiday }) }
    end
  end

  describe 'POST #create' do
    context 'when valid param' do
      let(:custom_holiday) { attributes_for :custom_holiday }

      subject { post :create, params: { holiday: custom_holiday } }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_holiday) }
    end

    context 'when started_at > ended_at' do
      let(:custom_holiday) { attributes_for :custom_holiday, started_at: '30/3/2017', ended_at: '1/3/2017' }

      subject { post :create, params: { holiday: custom_holiday } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(ended_at: Array)) }
    end

    context 'when invalid date format' do
      let(:custom_holiday) { attributes_for :custom_holiday, started_at: 'xxxxxx', ended_at: [1, 2, 1] }

      subject { post :create, params: { holiday: custom_holiday } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(started_at: Array, ended_at: Array)) }
    end

    context 'when missing params' do
      subject { post :create, params: { holiday: { started_at: '30/3/2017' } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(ended_at: Array, name: Array)) }
    end
  end

  describe 'PATCH #update' do
    context 'when valid params' do
      let(:custom_holiday) { create(:custom_holiday, company: company) }

      subject { patch :update, params: { id: custom_holiday.id, holiday: { started_at: '30/3/2017', ended_at: '1/4/2017' } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_holiday) }
    end

    context 'when invalid date format' do
      let(:custom_holiday) { create(:custom_holiday, company: company) }

      subject { post :update, params: { id: custom_holiday.id, holiday: { started_at: 'xxxxxx', ended_at: [1, 2, 1] } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(started_at: Array)) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when holiday have exist' do
      let(:custom_holiday) { create(:custom_holiday, company: company) }

      subject { post :destroy, params: { id: custom_holiday.id } }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when holiday have exist' do
      subject { post :destroy, params: { id: 0 } }

      its(:code) { is_expected.to eq '404' }
    end
  end
end
