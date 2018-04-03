# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::NotificationsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe '#index' do
    context 'when login_user has not notifications' do
      let(:attendance) { create :attendance, user: login_user }
      let!(:activities) { create_list :activity, 2, activitable: attendance }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(notifications: [], meta: response_pagination.merge(unread_notifications_count: Integer)) }
    end

    context 'when login_user has notifications' do
      let(:attendance) { create :attendance, user: login_user }
      let(:activities) { create_list :activity, 2, activitable: attendance }
      let!(:user_notifications_1) { create :user_notification, user: login_user, activity: activities[0] }
      let!(:user_notifications_2) { create :user_notification, user: login_user, activity: activities[1] }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(notifications: Array.new(2) { response_notification }, meta: response_pagination.merge(unread_notifications_count: Integer)) }
    end
  end

  describe '#read' do
    context 'when last_read_id is not found' do
      subject { post :read, params: { id: 99 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when login_user update last_read_noti_id success' do
      let(:attendance) { create :attendance, user: login_user }
      let(:activities) { create_list :activity, 2, activitable: attendance }
      let!(:user_notifications_1) { create :user_notification, user: login_user, activity: activities[0] }
      let!(:user_notifications_2) { create :user_notification, user: login_user, activity: activities[1] }

      subject { post :read, params: { id: user_notifications_2.activity.id } }

      its(:code) { is_expected.to eq '200' }
      it 'should change login_user last_read_noti_id' do
        is_expected
        login_user.reload
        expect(login_user.last_read_noti_id).to eq user_notifications_2.activity.id
      end
    end
  end
end
