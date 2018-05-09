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

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid param' do
        let!(:holidays) { create_list :holiday, 2, company: company }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(2) { response_holiday }) }
      end

      context 'when filter by year' do
        let!(:holiday) { create_list :holiday, 2, company: company, started_at: Date.current, ended_at: Date.current + 1.day }

        subject { get :index, params: { year: Date.current.year } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(2) { response_holiday }) }
      end

      context 'when filter by year response empty data' do
        let!(:holiday) { create_list :holiday, 2, company: company, started_at: Date.current, ended_at: Date.current + 1.day }

        subject { get :index, params: { year: Date.current.year - 1 } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end

  describe 'POST #import' do
    context 'when user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :import, params: { country: 'vietnam' } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when national holidays are not found' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let!(:national_holiday) { create :national_holiday, country: 'japan' }

      subject { post :import, params: { country: 'vietnam' } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(String)) }
    end

    context 'when national holidays are found' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let!(:holiday) { create :holiday, company: company }
      let!(:national_holiday) { create_list :national_holiday, 2, country: 'japan' }

      subject { post :import, params: { country: 'japan' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(2) { response_holiday }) }
      it 'should change holiday count' do
        expect { is_expected }.to change(company.holidays, :count)
      end
    end
  end

  describe 'POST #create' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:holiday) { attributes_for :holiday }

      subject { post :create, params: { holiday: holiday } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid param' do
        let(:holiday) { attributes_for :holiday }

        subject { post :create, params: { holiday: holiday } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_holiday) }
      end

      context 'when started_at > ended_at' do
        let(:holiday) { attributes_for :holiday, started_at: '30/3/2017', ended_at: '1/3/2017' }

        subject { post :create, params: { holiday: holiday } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(ended_at: Array)) }
      end

      context 'when invalid date format' do
        let(:holiday) { attributes_for :holiday, started_at: 'xxxxxx', ended_at: [1, 2, 1] }

        subject { post :create, params: { holiday: holiday } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(started_at: Array, ended_at: Array)) }
      end

      context 'when missing params' do
        subject { post :create, params: { holiday: { started_at: '30/3/2017' } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(ended_at: Array, name: Array)) }
      end
    end
  end

  describe 'PATCH #update' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:holiday) { create(:holiday, company: company) }

      subject { patch :update, params: { id: holiday.id, holiday: { started_at: '30/3/2017', ended_at: '1/4/2017' } } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid params' do
        let(:holiday) { create(:holiday, company: company) }

        subject { patch :update, params: { id: holiday.id, holiday: { started_at: '30/3/2017', ended_at: '1/4/2017' } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_holiday) }
      end

      context 'when invalid date format' do
        let(:holiday) { create(:holiday, company: company) }

        subject { post :update, params: { id: holiday.id, holiday: { started_at: 'xxxxxx', ended_at: [1, 2, 1] } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(started_at: Array)) }
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:holiday) { create(:holiday, company: company) }

      subject { post :destroy, params: { id: holiday.id } }

      its(:code) { is_expected.to eq '401' }
    end
    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when holiday have exist' do
        let(:holiday) { create(:holiday, company: company) }

        subject { post :destroy, params: { id: holiday.id } }

        its(:code) { is_expected.to eq '200' }
      end

      context 'when holiday have exist' do
        subject { post :destroy, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end
    end
  end
end
