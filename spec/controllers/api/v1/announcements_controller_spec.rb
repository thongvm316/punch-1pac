# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AnnouncementsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company, owner: false }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'GET #index' do
    let!(:announcement_1) { create :announcement, target: 'everyone' }
    let!(:announcement_2) { create :announcement, target: 'owners' }

    context 'when user is not owner' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(announcements: [response_announcement], meta: response_pagination) }
    end

    context 'when user is owner' do
      let(:login_user) { create :user, company: company, owner: true }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(announcements: Array.new(2) { response_announcement }, meta: response_pagination) }
    end

    context 'when read status is read' do
      let!(:announcement_1) { create :announcement, target: 'everyone' }
      let!(:announcement_2) { create :announcement, target: 'owners' }
      let(:login_user) { create :user, company: company, owner: true }

      let!(:read_announcement_1) { create :read_announcement, user: login_user, announcement: announcement_1 }
      let!(:read_announcement_2) { create :read_announcement, user: login_user, announcement: announcement_2 }

      subject { get :index, params: { read_status: 'read' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(announcements: Array.new(2) { response_announcement }, meta: response_pagination) }
    end

    context 'when read status is unread' do
      let!(:announcement_1) { create :announcement, target: 'everyone' }
      let!(:announcement_2) { create :announcement, target: 'owners' }
      let(:login_user) { create :user, company: company, owner: true }

      subject { get :index, params: { read_status: 'unread' } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(announcements: Array.new(2) { response_announcement }, meta: response_pagination) }
    end
  end

  describe 'GET #show' do
    let!(:announcement_1) { create :announcement, target: 'everyone' }
    let!(:announcement_2) { create :announcement, target: 'owners' }

    context 'when announcement is not existed' do
      subject { get :show, params: { id: announcement_2.id + 2 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when user is not owner and announcement.target = owners' do
      subject { get :show, params: { id: announcement_2.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when user is not owner and announcement.target = everyone' do
      subject { get :show, params: { id: announcement_1.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_announcement) }
    end

    context 'when user is owner' do
      let(:login_user) { create :user, company: company, owner: true }

      subject { get :show, params: { id: announcement_1.id } }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_announcement) }
    end
  end
end
