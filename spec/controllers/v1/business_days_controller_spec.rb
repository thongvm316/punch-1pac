# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::BusinessDaysController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before { authenticate_user(login_user) }

  shared_examples 'a not found business_day' do
    let(:company) { create :company }
    let(:login_user) { create :user, company: company }

    its(:code) { is_expected.to eq '404' }
    its(:body) { is_expected.to be_json_as(response_404) }
  end

  describe 'GET #index' do
    context 'when company has business_days' do
      let!(:business_days) { create_list :business_day, 2, company: company }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(2) { response_business_day }) }
    end

    context 'when company has not business_days' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as([]) }
    end
  end

  describe 'PUT #update' do
    context 'when business_day is not exists' do
      subject { patch :update, params: { id: 1 } }

      it_behaves_like 'a not found business_day'
    end

    context 'when business_day is exists' do
      let(:business_day) { create :business_day, company: company }

      context 'when params are valid' do
        subject { patch :update, params: { id: business_day.id, business_day: { weekday: 'sunday' } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_business_day) }
        it 'changes business_day.weekday' do
          is_expected
          expect(BusinessDay.find(business_day.id).weekday).to eq 'sunday'
        end
      end

      context 'when params are invalid' do
        subject { patch :update, params: { id: business_day.id, business_day: { weekday: 'unknown' } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(weekday: Array)) }
      end
    end
  end

  describe 'POST #create' do
    context 'when params are valid' do
      let(:business_day_params) { attributes_for(:business_day, company: company) }

      subject { post :create, params: { business_day: business_day_params } }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_business_day) }
    end

    context 'when params are invalid' do
      subject { post :create, params: { business_day: attributes_for(:business_day, weekday: 'unknown') } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(weekday: Array)) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when business_day is not exists' do
      subject { delete :destroy, params: { id: 1 } }

      it_behaves_like 'a not found business_day'
    end

    context 'when business_day is exists' do
      let(:business_day) { create :business_day, company: company }

      subject { delete :destroy, params: { id: business_day.id } }

      its(:code) { is_expected.to eq '200' }
      it 'does not persisted anymore' do
        is_expected
        expect(BusinessDay.find_by(id: business_day.id)).to be_nil
      end
    end
  end
end
