# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::GroupsController, type: :controller do
  let(:company) { create :company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      subject { get :index }
      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let!(:groups) { create_list(:group, 3, company: company, users: [login_user]) }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(3) { response_group(1) }) }
    end
  end

  describe 'GET #show' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { get :show, params: { id: group.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params are valid ' do
        let(:group) { create :group, company: company, users: [login_user] }
        let(:permissions_size) { group.permissions.size }

        subject { get :show, params: { id: group.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_group(1)) }
      end

      context 'when invalid params' do
        subject { get :show, params: { id: 0 }, format: :json }

        its(:code) { is_expected.to eq '404' }
        its(:body) { is_expected.to be_json_as(response_404) }
      end
    end
  end

  describe 'POST #create' do
    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { post :create, params: { group: { name: '' } } }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when log in user is superadmin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when params are valid' do
        let(:image) { fixture_file_upload('images/image.png', 'image/png') }

        subject { post :create, params: { group: { name: 'group here', description: 'nothing', image: image } } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_group) }

        it 'should have image' do
          is_expected
          expect(Group.last.image_url).to be_truthy
        end
      end

      context 'when params are invalid' do
        subject { post :create, params: { group: { name: '' } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
      end
    end
  end

  describe 'PATCH #update' do
    context 'when group is not existed' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { patch :update, params: { id: group.id + 1, group: { name: 'kekeke' } }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { patch :update, params: { id: group.id, group: { name: 'kekeke' } } }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when login_user is in group' do
        let(:group) { create :group, company: company, users: [login_user] }

        context 'when params is invalid' do
          subject { patch :update, params: { id: group.id, group: { name: '' } } }

          its(:code) { is_expected.to eq '422' }
          its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
        end

        context 'when params is valid' do
          let(:image) { fixture_file_upload('images/image.png', 'image/png') }

          subject { patch :update, params: { id: group.id, group: { name: 'Kekeke', description: 'nothing', image: image } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_group(1)) }

          it 'can upload a image' do
            is_expected
            expect(group.image_url).not_to be_nil
          end
        end
      end

      context 'when login_user is not in group' do
        let(:group) { create :group, company: company }

        subject { patch :update, params: { id: group.id, group: { name: 'kekeke' } } }

        its(:code) { is_expected.to eq '401' }
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:group) { create :group, company: company }

    context 'when log in user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { delete :destroy, params: { id: group.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when log in user is admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      context 'when valid params' do
        subject { delete :destroy, params: { id: group.id } }

        its(:code) { is_expected.to eq '200' }
      end
    end
  end

  shared_examples 'group_id or user_id is not found' do
    let(:group) { create :group, company: company }

    context 'when user_id is not found' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { post :add_user, params: { id: group.id, user_id: nil }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when group_id is not found' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { post :add_user, params: { id: group.id + 99, user_id: login_user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end
  end

  describe 'POST #add_user' do
    it_behaves_like 'group_id or user_id is not found'

    context 'when login_user = member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user] }

      subject { post :add_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user = admin' do
      context 'when login_user not in target_group' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'member' }
        let(:group) { create :group, company: company, users: [login_user] }
        let!(:other_group) { create :group, company: company }

        subject { post :add_user, params: { id: other_group.id, user_id: target_user.id }, format: :json }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(response_401) }
      end

      context 'when target_user is member' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'member' }
        let(:group) { create :group, company: company, users: [login_user] }

        context 'when user already in a group' do
          let!(:other_group) { create :group, company: company, users: [target_user] }

          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '422' }
          its(:body) { is_expected.to be_json_as(response_422(group: Array)) }
        end

        context 'when user is not in a group' do
          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should change user group' do
            is_expected
            expect(target_user.groups.first).to eq group
          end
        end
      end

      context 'when target_user is admin' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:target_user) { create :user, company: company, role: 'admin' }
        let(:group) { create :group, company: company, users: [login_user] }

        context 'when user already in a group' do
          let!(:other_group) { create :group, company: company, users: [target_user] }

          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should add user new group' do
            is_expected
            expect(target_user.groups).to include(other_group, group)
          end
        end

        context 'when user is not in a group' do
          subject { post :add_user, params: { id: group.id, user_id: target_user.id } }

          its(:code) { is_expected.to eq '200' }
          it 'should add user new group' do
            is_expected
            expect(target_user.groups.first).to eq group
          end
        end
      end
    end
  end

  describe 'DELETE #remove_user' do
    it_behaves_like 'group_id or user_id is not found'

    context 'when login_user not in target_group' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company }

      subject { post :remove_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user.groups includes target_group but target_user not in target_group' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user] }

      subject { post :remove_user, params: { id: group.id, user_id: target_user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when params are valid' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:target_user) { create :user, company: company, role: 'member' }
      let(:group) { create :group, company: company, users: [login_user, target_user] }

      subject { delete :remove_user, params: { id: group.id, user_id: target_user.id } }

      its(:code) { is_expected.to eq '200' }
      it 'should remove user group' do
        is_expected
        target_user.reload
        expect(target_user.groups).to eq []
      end
    end
  end

  describe 'GET #report' do
    context 'when login_user.role = member' do
      let(:group) { create :group, company: company }
      let(:login_user) { create :user, company: company, role: 'member', groups: [group] }

      subject { get :report, params: { id: group.id } }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user.role = admin' do
      let(:groups) { create_list :group, 2, company: company }
      let(:login_user) { create :user, company: company, role: 'admin', groups: groups }
      let!(:users) { create_list :user, 2, company: company, role: 'member', groups: [groups.first] }

      context 'when group in login_user.groups' do
        subject { get :report, params: { id: groups.first.id }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(results: Array.new(3) { response_group_report }, meta: Hash) }
      end

      context 'when group not in login_user.groups' do
        let(:group) { create :group, company: company }

        subject { get :report, params: { id: group.id } }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(response_401) }
      end
    end

    context 'when login_user.role = superadmin' do
      let(:groups) { create_list :group, 2, company: company }
      let(:login_user) { create :user, company: company, role: 'superadmin', groups: groups }
      let!(:users) { create_list :user, 2, company: company, role: 'member', groups: [groups.first] }

      subject { get :report, params: { id: groups.first.id }, format: :json }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(results: Array.new(3) { response_group_report }, meta: Hash) }
    end

    context 'when report csv has data' do
      let(:groups) { create_list :group, 2, company: company }
      let(:login_user) { create :user, company: company, role: 'superadmin', groups: groups }
      let!(:users) { create_list :user, 2, company: company, role: 'member', groups: [groups.first] }

      subject { get :report, params: { id: groups.first.id }, format: :csv }

      it do
        is_expected
        headers = response.body.split("\n")
        expect(headers.first).to include 'Email,Name,Attend Ok,Attend Late,Leave Ok,Leave Early,Annual Leave,Number of minutes attend late,Number of minutes leave early,Working Hours'
        expect(response.header['Content-Type']).to eql 'text/csv; charset=utf-8; header=present'
        expect(headers.size).to eq(5)
      end
    end

    context 'when superadmin export report csv of empty member group' do
      let(:group) { create :group, company: company }
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      subject { get :report, params: { id: group.id }, format: :csv }

      it do
        is_expected
        headers = response.body.split("\n")
        expect(headers.first).to include 'Email,Name,Attend Ok,Attend Late,Leave Ok,Leave Early,Annual Leave,Number of minutes attend late,Number of minutes leave early,Working Hours'
        expect(response.header['Content-Type']).to eql 'text/csv; charset=utf-8; header=present'
      end
    end

    context 'when report zip has data' do
      let(:group) { create :group, company: company }
      let(:login_user) { create :user, company: company, role: 'superadmin', groups: [group] }
      let!(:users) { create_list :user, 2, :with_attendance, company: company, role: 'member', groups: [group] }

      subject { get :report, params: { id: group.id, date: Time.current }, format: :zip }

      it do
        is_expected
        expect(response.header['Content-Type']).to eql 'text/zip; charset=utf-8; header=present'
        expect(response.code).to eq '200'
      end
    end
  end

  describe 'GET #personal_report' do
    context 'when login_user.role = member' do
      let(:group) { create :group, company: company }
      let(:login_user) { create :user, company: company, role: 'member', groups: [group] }

      subject { get :personal_report, params: { id: group.id, user_id: login_user.id } }

      its(:code) { is_expected.to eq '401' }
      its(:body) { is_expected.to be_json_as(response_401) }
    end

    context 'when login_user.role = admin' do
      let(:groups) { create_list :group, 2, company: company }
      let(:login_user) { create :user, company: company, role: 'admin', groups: [groups.first] }
      let!(:user) { create :user, company: company, role: 'member', groups: [groups.first] }

      context 'when group in login_user.groups' do
        subject { get :personal_report, params: { id: groups.first.id, user_id: user.id }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(attendances: Array.new { response_attendance }, holidays: Array.new { response_holiday }, report: response_user_report, meta: response_meta) }
      end

      context 'when group not in login_user.groups' do
        let(:group) { create :group, company: company }

        subject { get :personal_report, params: { id: group.id, user_id: user.id } }

        its(:code) { is_expected.to eq '401' }
        its(:body) { is_expected.to be_json_as(response_401) }
      end

      context 'when user not in group' do
        let!(:user2) { create :user, company: company, role: 'member', groups: [groups.last] }

        subject { get :personal_report, params: { id: groups.first.id, user_id: user2.id } }

        its(:code) { is_expected.to eq '404' }
      end
    end

    context 'when login_user.role = superadmin' do
      let(:groups) { create_list :group, 2, company: company }
      let(:login_user) { create :user, company: company, role: 'superadmin', groups: [groups.first] }
      let!(:user) { create :user, company: company, role: 'member', groups: [groups.first] }

      context 'when group in login_user.groups' do
        subject { get :personal_report, params: { id: groups.first.id, user_id: user.id }, format: :json }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(attendances: Array.new { response_attendance }, holidays: Array.new { response_holiday }, report: response_user_report, meta: response_meta) }
      end

      context 'when user not in group' do
        let!(:user2) { create :user, company: company, role: 'member', groups: [groups.last] }

        subject { get :personal_report, params: { id: groups.first.id, user_id: user2.id } }

        its(:code) { is_expected.to eq '404' }
      end
    end
  end
end
