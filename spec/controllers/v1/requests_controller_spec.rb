# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::RequestsController, type: :controller do
  let(:company) { create :company }

  before { authenticate_user(login_user) }

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end
    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when have not any request' do
        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(requests: [], meta: response_pagination) }
      end

      context 'when have requests' do
        let!(:requests) { create_list :request, 3 }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(requests: Array.new(3) { response_request }, meta: response_pagination) }
      end
    end
  end

  describe 'POST #create' do
    let(:login_user) { create :user, company: company, role: 'admin' }

    context 'when params are invalid' do
      let(:attendance) { create :attendance }
      let(:request_params) { attributes_for(:request, reason: 'a' * 501) }

      subject { post :create, params: { request: request_params.merge(attendance_id: attendance.id, user: login_user) } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(reason: Array)) }
    end

    context 'when params are valid' do
      let(:attendance) { create :attendance }
      let(:request_params) { attributes_for(:request) }

      subject { post :create, params: { request: request_params.merge(attendance_id: attendance.id, user: login_user) } }

      its(:code) { is_expected.to eq '201' }
      its(:body) { is_expected.to be_json_as(response_request) }
      it 'should change number of request' do
        expect { subject }.to change(Request, :count).by(1)
      end
    end
  end

  describe 'PATCH #update' do
    let(:login_user) { create :user, company: company, role: 'member' }
    let(:req) { create :request, user: login_user }

    context 'when request is not existed' do
      subject { patch :update, params: { id: req.id + 1 } }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when params are invalid' do
      subject { patch :update, params: { id: req.id, request: { reason: 'a' * 501 } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(reason: Array)) }
    end

    context 'when params are valid' do
      subject { patch :update, params: { id: req.id, request: { reason: 'hehe' } } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_request) }
      it 'should change request attributes' do
        is_expected
        expect(Request.find(req.id).reason).to eq 'hehe'
      end
    end
  end

  describe 'POST #approve' do
    context 'when login user is member' do
      let(:company) { create :company, :with_business_days }
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:attendance) { create :attendance, user: login_user, attended_at: '08:30', attending_status: 'attend_late' }
      let(:req) { create :request, attended_at: '07:55', attendance: attendance }

      subject { post :approve, params: { id: req.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      context 'when request is not existed' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:req) { create :request }

        subject { post :approve, params: { id: req.id + 1 } }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end

      context 'when request is existed' do
        let(:company) { create :company, :with_business_days }
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:attendance) { create :attendance, user: login_user, attended_at: '08:30', attending_status: 'attend_late' }
        let(:req) { create :request, attended_at: '07:55', attendance: attendance }

        subject { post :approve, params: { id: req.id } }

        its(:code) { is_expected.to eq '200' }
        it do
          is_expected
          attendance = Attendance.find(req.attendance.id)
          expect(Request.find(req.id).status).to eq 'approved'
          expect(attendance.attended_at.strftime('%H:%M')).to eq '07:55'
          expect(attendance.attending_status).to eq 'attend_ok'
        end
      end
    end
  end

  describe 'POST #reject' do
    let(:req) { create :request }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :reject, params: { id: req.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when request is not existed' do
        subject { post :reject, params: { id: req.id + 1 } }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end

      context 'when request is existed' do
        subject { post :reject, params: { id: req.id } }

        its(:code) { is_expected.to eq '200' }
        it 'should change status to rejected' do
          is_expected
          expect(Request.find(req.id).status).to eq 'rejected'
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let!(:req) { create :request, user: login_user }

      subject { delete :destroy, params: { id: req.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when request is not existed' do
        subject { delete :destroy, params: { id: 1 } }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end

      context 'when request is existed' do
        let!(:req) { create :request, user: login_user }

        subject { delete :destroy, params: { id: req.id } }

        its(:code) { is_expected.to eq '200' }
        it 'should change number of request' do
          expect { subject }.to change(Request, :count).by(-1)
        end
      end
    end
  end
end
