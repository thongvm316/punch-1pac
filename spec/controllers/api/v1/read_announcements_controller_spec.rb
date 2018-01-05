# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ReadAnnouncementsController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company, owner: false }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'POST #create' do
    context 'when announcement is not existed' do
      subject { post :create, params: { id: 1, user_id: login_user.id }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when user already read announcement' do
      let(:announcement)      { create :announcement }
      let(:read_announcement) { create :read_announcement, user: login_user, announcement: announcement }

      subject { post :create, params: { id: announcement.id, user_id: login_user.id } }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when user does not read announcement yet' do
      let(:announcement)      { create :announcement }

      subject { post :create, params: { id: announcement.id, user_id: login_user.id } }

      its(:code) { is_expected.to eq '200' }
      it 'change count by 1' do
        expect { subject }.to change(ReadAnnouncement, :count).by(1)
      end
    end
  end
end
