# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::AnnouncementsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company, owner: false }

  before { authenticate_user(login_user) }

  describe 'GET #index' do
    let!(:announcement_1) { create :announcement, target: 'everyone' }
    let!(:announcement_2) { create :announcement, target: 'owners' }

    context 'when user is not owner' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as([response_announcement]) }
    end

    context 'when user is owner' do
      let(:login_user) { create :user, company: company, owner: true }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(Array.new(2) { response_announcement }) }
    end
  end

  describe 'GET #latest' do
    let!(:announcement_1) { create :announcement, target: 'everyone', status: 'urgent' }
    let!(:announcement_2) { create :announcement, target: 'everyone', status: 'normal' }
    let!(:announcement_3) { create :announcement, target: 'owners', status: 'urgent' }

    context 'when user is owner' do
      let(:login_user) { create :user, company: company, owner: true }

      subject { get :latest }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_announcement) }
    end

    context 'when user is not owner' do
      subject { get :latest }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(response_announcement) }
    end
  end

  describe 'GET #show' do
    let!(:announcement_1) { create :announcement, target: 'everyone' }
    let!(:announcement_2) { create :announcement, target: 'owners' }

    context 'when announcement is not existed' do
      subject { get :show, params: { id: announcement_2.id + 2 } }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when user is not owner and announcement.target = owners' do
      subject { get :show, params: { id: announcement_2.id } }

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
