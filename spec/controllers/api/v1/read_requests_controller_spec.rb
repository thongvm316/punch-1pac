# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ReadRequestsController, type: :controller do
  describe 'POST #create' do
    let(:company) { create :company }
    let(:login_user) { create :user, company: company }
    let(:req) { create :request }

    before do
      in_namespace(company)
      authenticate_user(login_user)
    end

    context 'when request is not existed' do
      subject { post :create, params: { id: req.id + 1 }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when request is existed but already read request' do
      let!(:read_request) { create :read_request, request: req, user: login_user }

      subject { post :create, params: { id: req.id } }

      its(:code) { is_expected.to eq '200' }
    end

    context 'when request is existed but not read request yet' do
      subject { post :create, params: { id: req.id } }

      its(:code) { is_expected.to eq '200' }
      it 'should change number of read_request' do
        expect { subject }.to change(ReadRequest, :count).by(1)
      end
    end
  end
end
