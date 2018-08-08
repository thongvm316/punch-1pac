# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:company) { create :company, :with_default_group }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #today_attendances' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :today_attendances }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { get :today_attendances }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is superadmin' do
      context 'when group had users' do
        let(:users) { create_list :user, 3, :with_attendance, company: company }
        let(:group) { create :group, company: company, users: users }
        let(:login_user) { create :user, company: company, role: 'superadmin' }

        subject { get :today_attendances, params: { group_id: group.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(users: Array.new(3) { response_user_with_attendance }, company: response_company) }
      end
      context 'when group not found' do
        let(:login_user) { create :user, company: company, role: 'superadmin' }

        subject { get :today_attendances, params: { group_id: -1 } }

        its(:code) { is_expected.to eq '404' }
      end
    end
  end

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      context 'when company had users' do
        let!(:users) { create_list :user, 3, company: company }
        let(:login_user) { create :user, company: company, role: 'admin' }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(users: Array.new(4) { response_user }, meta: response_pagination) }
      end
    end

    context 'filter by email' do
      let(:email) { Faker::Internet.email }
      let(:login_user) { create :user, company: company, role: 'admin' }
      let!(:user) { create :user, company: company, email: email }

      subject { get :index, params: { email: email } }
      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(users: Array.new(1) { response_user }, meta: response_pagination) }
    end
  end

  describe 'GET #show' do
    context 'when login user is member' do
      let(:user) { create :user, company: company, role: 'member' }

      context 'when show himself' do
        let(:permissions_number) { login_user.permissions.size }

        subject { get :show, params: { id: login_user.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user) }
      end

      context 'when show the other one' do
        subject { get :show, params: { id: user.id } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:user) { create :user, company: company, role: 'admin' }
      let(:permissions_number) { user.permissions.size }

      subject { get :show, params: { id: user.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_user) }
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:target_user) { create :user, company: company, activated: false }

      subject { delete :destroy, params: { id: target_user.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when target user is member' do
        let(:target_user) { create :user, company: company, activated: false, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, activated: false, role: 'admin' }

        subject { delete :destroy, params: { id: target_user.id } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user not found' do
        subject { delete :destroy, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end

      context 'when target user activated = true' do
        let(:target_user) { create :user, company: company, groups: login_user.groups, activated: true, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end
    end

    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when target user is member' do
        let(:target_user) { create :user, company: company, activated: false, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, activated: false, role: 'admin' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user is super admin' do
        let(:target_user) { create :user, company: company, activated: false, role: 'superadmin' }

        subject { delete :destroy, params: { id: target_user.id } }

        it 'should deleted target user' do
          is_expected
          expect(response.status).to eq 200
          expect(User.find_by(id: target_user.id)).to be_nil
        end
      end

      context 'when target user not found' do
        subject { delete :destroy, params: { id: 0 } }

        its(:code) { is_expected.to eq '404' }
      end

      context 'when target user activated = true' do
        let(:target_user) { create :user, company: company, groups: login_user.groups, activated: true, role: 'member' }

        subject { delete :destroy, params: { id: target_user.id }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end
    end
  end

  describe 'PATCH #change_password' do
    let(:login_user) { create :user, company: company, password: 'password', password_confirmation: 'password' }

    context 'when current_password invalid' do
      subject { patch :change_password, params: { current_password: 'invalid_password', password: '', password_confirmation: '' } }

      its(:code) { is_expected.to eq '422' }
      its(:body) do
        is_expected.to be_json_as(response_422(current_password: [I18n.t('errors.messages.incorrect')],
                                               password: [I18n.t('errors.messages.blank')]))
      end
    end

    context 'when password and password_confirmation empty invalid' do
      subject { patch :change_password, params: { current_password: 'password', password: 'fdfd', password_confirmation: '' } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(password: Array, password_confirmation: Array)) }
    end

    context 'when password and password_confirmation too short invalid' do
      let(:params) do
        {
          current_password: 'password',
          password: '1111',
          password_confirmation: '1111'
        }
      end

      subject { patch :change_password, params: params }
      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(password: [I18n.t('errors.messages.too_short', count: 6)])) }
    end

    context 'when missing current_password' do
      let(:params) do
        {
          password: 'password1',
          password_confirmation: 'password1'
        }
      end

      subject { patch :change_password, params: params }

      its(:body) { is_expected.to be_json_as(response_422(current_password: [I18n.t('errors.messages.incorrect')])) }
      its(:code) { is_expected.to eq '422' }
    end

    context 'when password and password_confirmation missmatch' do
      let(:params) do
        {
          current_password: 'password',
          password: 'password2',
          password_confirmation: 'password1'
        }
      end

      subject { patch :change_password, params: params }

      its(:body) { is_expected.to be_json_as(response_422(password_confirmation: Array)) }
      its(:code) { is_expected.to eq '422' }
    end

    context 'when params valid' do
      let(:params) do
        {
          current_password: 'password',
          password: 'password_1',
          password_confirmation: 'password_1'
        }
      end

      context 'when request from mobile' do
        subject { patch :change_password, params: params, format: :json }

        its(:code) { is_expected.to eq '200' }
        it 'should change password_digest' do
          is_expected
          expect { login_user.reload }.to change(login_user, :password_digest)
        end
      end

      context 'when update column password_changed' do
        subject { patch :change_password, params: params }

        it 'update passsword_changed = true when password_changed = false' do
          is_expected
          expect { login_user.reload }.to change(login_user, :password_changed).from(false).to(true)
        end

        it 'does not update password_changed when password_changed = true' do
          is_expected
          login_user.password_changed = true
          expect { login_user.reload }.not_to change(login_user, :password_changed)
        end
      end
    end
  end

  describe 'PATCH #update' do
    let(:target_user) { create :user, company: company, role: 'member', gender: 'female' }

    context 'when login user is member' do
      context 'when update itself' do
        let(:login_user) { target_user }
        let(:permissions_number) { target_user.permissions.count }

        context 'when add permissions' do
          let(:permissions) { create_list(:permission, 3).pluck(:id) }

          subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_user_with_groups) }
        end

        context 'when update without permission' do
          let(:params) do
            {
              gender: 'male',
              email: 'kumbe@thebeast.com',
              name: 'thoi'
            }
          end
          subject { patch :update, params: { id: target_user.id, user: params } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_user_with_groups) }
          it 'should change user name attributes' do
            is_expected
            attendance = User.find(target_user.id)
            expect(attendance.name).to eq params[:name]
            expect(attendance.email).to eq params[:email]
            expect(attendance.gender).to eq params[:gender]
          end
        end
      end

      context 'when update the other user' do
        let(:login_user) { create :user, company: company, role: 'member' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end

      context 'when target user is super admin' do
        let(:target_user) { create :user, company: company, role: 'superadmin' }
        let(:permissions) { create_list(:permission, 3).pluck(:id) }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi', permission_ids: permissions } } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when target user is admin' do
        let(:target_user) { create :user, company: company, role: 'admin' }

        subject { patch :update, params: { id: target_user.id, user: { name: 'thoi' } } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_user_with_groups) }
        it 'should update target_user name' do
          is_expected
          expect { target_user.reload }.to change(target_user, :name).to('thoi')
        end
      end
    end
  end

  describe 'POST #create_multi' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

      subject { post :create_multi, params: { csv_file: csv_file } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when valid csv file' do
        let(:csv_file) { fixture_file_upload('files/valid.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: Array.new(3) { response_user }, errors: { lines: [] }) }
      end

      context 'when csv file empty' do
        let(:csv_file) { fixture_file_upload('files/empty.text', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(csv_file: Array)) }
      end

      context 'when failed some lines' do
        let(:csv_file) { fixture_file_upload('files/invalid_at_line_2.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: Array.new(2) { response_user }, errors: { lines: Array }) }
      end

      context 'when failed all' do
        let(:csv_file) { fixture_file_upload('files/invalid_all.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(users: [], errors: { lines: Array }) }
      end

      context 'when invalid mime type' do
        let(:csv_file) { fixture_file_upload('files/image.csv', 'text/csv') }

        subject { post :create_multi, params: { csv_file: csv_file } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(csv_file: Array)) }
      end
    end
  end

  describe 'POST #create' do
    let(:user_params) { attributes_for(:user) }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :create, params: { user: user_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params validate' do
        let(:user_params) { attributes_for(:user).merge(group_id: create(:group, company: company)) }

        subject { post :create, params: { user: user_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_user) }
      end

      context 'when group id missing' do
        let(:user_params) { attributes_for(:user) }

        subject { post :create, params: { user: user_params } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(group: Array)) }
      end

      context 'when params empty' do
        let(:params) { { username: '', permissions_ids: [] } }

        subject { post :create, params: { user: params } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(group: Array, name: Array, email: Array)) }
      end
    end
  end

  describe 'POST #activate' do
    let(:login_user) { create :user, :with_groups, company: company, role: 'superadmin' }

    context 'when user.activated = true' do
      let!(:user) { create :user, company: company, groups: login_user.groups }

      subject { post :activate, params: { id: user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when login_user.activated = false' do
      let!(:user) { create :user, company: company, groups: login_user.groups, activated: false }

      subject { post :activate, params: { id: user.id } }

      it do
        is_expected
        user.reload
        expect(subject.code).to eq '200'
        expect(user.activated).to be_truthy
      end
    end
  end

  describe 'POST #deactivate' do
    let(:login_user) { create :user, :with_groups, company: company, role: 'superadmin' }

    context 'when user.activated = false' do
      let!(:user) { create :user, company: company, groups: login_user.groups, activated: false }

      subject { post :deactivate, params: { id: user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when login_user.activated = true' do
      let!(:user) { create :user, company: company, groups: login_user.groups }

      subject { post :deactivate, params: { id: user.id } }

      it do
        is_expected
        user.reload
        expect(subject.code).to eq '200'
        expect(user.activated).to be_falsey
      end
    end
  end

  describe 'GET #group_pending_requests' do
    let(:company) { create :company, :with_business_days }
    let(:groups) { create_list :group, 2, company: company }

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, groups: [groups.first], role: 'member' }
      let!(:requests) { create_list :request, 11, status: :pending, user: create(:user, company: company, groups: [groups.first]) }

      subject { get :group_pending_requests }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, groups: [groups.first], role: 'admin' }
      let!(:requests) { create_list :request, 11, status: :pending, user: create(:user, company: company, groups: [groups.first]) }

      subject { get :group_pending_requests, format: :json }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(1) { response_pending_request }) }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, groups: [groups.first], role: 'superadmin' }
      let!(:requests) { create_list :request, 11, status: :pending, user: create(:user, company: company, groups: [groups.first]) }

      subject { get :group_pending_requests, format: :json }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(1) { response_pending_request }) }
    end
  end
end
