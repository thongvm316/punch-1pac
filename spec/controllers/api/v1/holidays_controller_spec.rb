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
        let!(:holidays) do
          create_list :holiday, 2, company: company
          create_list :holiday, 2, company: company, name: 'kata'
        end

        subject { get :index, params: { name: 'kata' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(2) { response_holiday }) }
      end
    end
  end

  describe 'POST #import' do
    let(:holidays) { FactoryBot.attributes_for_list(:holiday, 3) }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :import, params: { holidays: holidays } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params valid' do
        subject { post :import, params: { holidays: holidays } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(3) { response_holiday }) }
      end

      context 'when got 1 fail import' do
        before do
          holidays << [fails: 'fails']
        end

        subject { post :import, params: { holidays: holidays } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(3) { response_holiday }) }
      end

      context 'when params empty' do
        subject { post :import, params: { holidays: [] } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(error: 'Invalid arguments!') }
      end

      context 'when params invalid' do
        subject { post :import, params: { holidays: [xx: 'xx'] } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(0)) }
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
