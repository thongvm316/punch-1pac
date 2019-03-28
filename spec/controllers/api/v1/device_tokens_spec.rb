# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::DeviceTokensController, type: :controller do
  let(:company) { create :company, :with_default_group }

  describe 'POST #create' do
    let(:login_user) { create :user, company: company }

    context 'when user login' do
      before do
        in_namespace(company)
        authenticate_user(login_user)
      end

      context 'when param valid' do
        let(:device_token_params) { { device_token: '923cj923nd', device_type: 'ios' } }

        subject { post :create, params: device_token_params }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_device_token) }

        it 'should change number of device token' do
          expect { subject }.to change(DeviceToken, :count).by(1)
        end
      end

      context 'when params invalid' do
        let(:device_token_params) { { device_token: nil, device_type: nil } }

        subject { post :create, params: device_token_params }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(device_token: Array, device_type: Array)) }
      end
    end

    context 'when user not login' do
      before { in_namespace(company) }

      context 'when cannot create and redirect' do
        let(:device_token_params) { { device_token: '923cj923nd', device_type: 'ios' } }

        subject { post :create, params: device_token_params }

        its(:code) { is_expected.to eq '302' }

        it 'should not change number of device token' do
          expect { subject }.to change(DeviceToken, :count).by(0)
        end
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:login_user) { create :user, company: company }

    before do
      in_namespace(company)
      authenticate_user(login_user)
    end

    context 'when device token is not existed' do
      subject { delete :destroy, params: { device_token: 'cnjanjdnsaj' }, format: :json }

      its(:code) { is_expected.to eq '404' }
      its(:body) { is_expected.to be_json_as(response_404) }
    end

    context 'when device token is existed' do
      let!(:device) { create :device_token, user: login_user, device_token: 'fk2mk35mdwv', device_type: 'android' }

      subject { delete :destroy, params: { device_token: device.device_token } }

      its(:code) { is_expected.to eq '200' }
      it 'should change number of device token' do
        expect { subject }.to change(DeviceToken, :count).by(-1)
      end
    end
  end
end
