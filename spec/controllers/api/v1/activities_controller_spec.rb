# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ActivitiesController, type: :controller do
  let(:company) { create :company }
  let(:login_user) { create :user, company: company }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe '#index' do
    context 'when login_user has not activities' do
      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(activities: [], meta: response_pagination) }
    end

    context 'when login_user has activities' do
      let(:attendance) { create :attendance, user: login_user }
      let!(:activities) { create_list :activity, 2, activitable: attendance, user: login_user }

      subject { get :index }

      its(:code) { is_expected.to eq '200' }
      its(:body) { is_expected.to be_json_as(activities: Array.new(2) { response_activity }, meta: response_pagination) }
    end
  end
end
