# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::RequestsController, type: :controller do
  let(:company) { create :company, :with_default_group }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  shared_examples 'request not belongs to current user' do
    let(:req) { create :request, user: create(:user) }

    its(:code) { is_expected.to eq '401' }
  end

  shared_examples 'request status is not pending' do
    context 'when request status is approved' do
      let(:req) { create :request, user: login_user, status: 'approved' }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when request status is rejected' do
      let(:req) { create :request, user: login_user, status: 'rejected' }

      its(:code) { is_expected.to eq '401' }
    end
  end

  describe 'GET #index' do
    shared_examples 'filter by group' do
      context 'when params have group_id' do
        let!(:requests) { create_list :request, 3, user: request_creator }

        subject { get :index, params: { group_id: group.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(requests: Array.new(result_count) { response_request }, meta: response_pagination) }
      end
    end

    shared_examples 'filter by status' do
      context 'when params have status' do
        let!(:requests) { create_list :request, 3, user: login_user, status: 'pending' }

        subject { get :index, params: { status: 'pending' } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(requests: Array.new(3) { response_request }, meta: response_pagination) }
      end
    end

    context 'when have not any request' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(requests: [], meta: response_pagination) }
    end

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member', groups: [company.groups.last] }
      let!(:requests) { create_list :request, 3, user: login_user }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(requests: Array.new(3) { response_request }, meta: response_pagination) }

      context 'when member sending his group id' do
        let(:request_creator) { login_user }
        let(:group) { login_user.groups.last }
        let(:result_count) { 3 }
        it_behaves_like 'filter by group'
      end

      context 'when member sending different group id' do
        let(:request_creator) { login_user }
        let(:group) { create :group, company: company }
        let(:result_count) { 0 }
        it_behaves_like 'filter by group'
      end

      it_behaves_like 'filter by status'
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin', groups: [company.groups.last] }
      let!(:requests) { create_list :request, 3, user: create(:user, groups: login_user.groups) }

      subject { get :index }

      its(:body) { is_expected.to be_json_as(requests: Array.new(3) { response_request }, meta: response_pagination) }
      its(:code) { is_expected.to eq '200' }

      context 'when admin sending his group id' do
        let(:request_creator) { create :user, company: company, groups: [login_user.groups.last] }
        let(:group) { login_user.groups.last }
        let(:result_count) { 3 }
        it_behaves_like 'filter by group'
      end

      context 'when admin sending different group id' do
        let(:request_creator) { login_user }
        let(:group) { create :group, company: company }
        let(:result_count) { 0 }
        it_behaves_like 'filter by group'
      end

      it_behaves_like 'filter by status'
    end

    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }
      let!(:requests) { create_list :request, 3, user: create(:user, company: company) }
      let(:group) { create :group, company: company }
      let(:request_creator) { create :user, company: company, groups: [group] }
      let(:result_count) { 3 }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(requests: Array.new(3) { response_request }, meta: response_pagination) }

      it_behaves_like 'filter by group'
      it_behaves_like 'filter by status'
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
      subject { patch :update, params: { id: req.id + 1 }, format: :json }

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

    context 'when fails authorize' do
      subject { patch :update, params: { id: req.id, request: { reason: 'hehe' } } }

      it_behaves_like 'request status is not pending'
      it_behaves_like 'request not belongs to current user'
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
      let(:login_user) { create :user, company: company, role: 'admin' }
      context 'when request is not existed' do
        let(:req) { create :request }

        subject { post :approve, params: { id: req.id + 1 }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end

      context 'when request is existed' do
        let(:company) { create :company, :with_business_days }
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:attendance) { create :attendance, user: login_user, attended_at: '08:30', attending_status: 'attend_late' }
        let(:req) { create :request, attended_at: '07:55', left_at: '18:00', attendance: attendance }

        before { Timecop.freeze(Time.zone.local(2018, 1, 3)) }

        after { Timecop.return }

        subject { post :approve, params: { id: req.id } }

        its(:code) { is_expected.to eq '200' }
        it do
          is_expected
          req.reload
          attendance = Attendance.find(req.attendance.id)
          expect(req.status).to eq 'approved'
          expect(attendance.attended_at.strftime('%H:%M')).to eq '07:55'
          expect(attendance.attending_status).to eq 'attend_ok'
          expect(req.admin_id).not_to be_nil
        end
      end

      context 'when fails authorize' do
        subject { post :approve, params: { id: req.id } }

        it_behaves_like 'request status is not pending'
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
        subject { post :reject, params: { id: req.id + 1 }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end

      context 'when request is existed' do
        subject { post :reject, params: { id: req.id } }

        its(:code) { is_expected.to eq '200' }
        it 'should change status to rejected' do
          is_expected
          req.reload
          expect(req.status).to eq 'rejected'
          expect(req.admin_id).not_to be_nil
        end
      end

      context 'when fails authorize' do
        subject { post :reject, params: { id: req.id } }

        it_behaves_like 'request status is not pending'
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:login_user) { create :user, company: company, role: 'admin' }

    context 'when request is not existed' do
      subject { delete :destroy, params: { id: 1 }, format: :json }

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

    context 'when fails authorize' do
      subject { delete :destroy, params: { id: req.id } }

      it_behaves_like 'request not belongs to current user'
    end
  end
end
