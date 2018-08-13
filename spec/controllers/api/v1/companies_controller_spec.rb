# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CompaniesController, type: :controller do
  let(:company) { create :company, name: '91E35B8F57E0' }

  before do
    in_namespace(company)
    authenticate_user(login_user)
  end

  describe 'PATCH #update' do
    context 'when params are valid' do
      context 'when login user is super admin' do
        let(:login_user) { create :user, company: company, role: 'superadmin' }
        let(:params) { attributes_for(:company, name: 'AF200F52', logo: fixture_file_upload('images/image.png', 'image/png'), punch_method: 'qrcode_scan') }

        subject { patch :update, params: { company: params } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
        it 'changes company.name && company.punch_method' do
          is_expected
          expect { company.reload }
            .to change { company.name }.from('91E35B8F57E0').to('AF200F52')
                                       .and change { company.punch_method }.from('default').to('qrcode_scan')
        end
      end

      context 'when login user is admin' do
        let(:login_user) { create :user, company: company, role: 'admin' }
        let(:params) { attributes_for(:company, logo: fixture_file_upload('images/image.png', 'image/png')) }

        subject { patch :update, params: { company: params } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_company) }
        it 'changes company.name' do
          is_expected
          expect(Company.find(company.id).name).to eq params[:name]
        end
      end

      context 'when login user is member' do
        let(:params) { attributes_for(:company) }
        let(:login_user) { create :user, company: company, role: 'member' }

        subject { patch :update, params: { company: params } }

        its(:code) { is_expected.to eq '401' }
      end
    end

    context 'when params are invalid' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      subject { patch :update, params: { company: { name: '' } } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
    end

    context 'when invalid loge mimi type' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:params) { { logo: fixture_file_upload('files/valid.csv', 'image/png') } }

      subject { patch :update, params: { company: params } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(logo: Array)) }
    end

    context 'when logo more than 2 mb' do
      let(:login_user) { create :user, company: company, role: 'admin' }
      let(:params) { { logo: fixture_file_upload('images/large_image.jpg', 'image/jpg') } }

      subject { patch :update, params: { company: params } }

      its(:code) { is_expected.to eq '422' }
      its(:body) { is_expected.to be_json_as(response_422(logo: Array)) }
    end
  end

  describe 'PATCH #deactivate' do
    context 'when superadmin do' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }

      subject { patch :deactivate }

      its(:code) { is_expected.to eq '200' }
      it 'is deactivated' do
        is_expected
        expect(Company.find_by(id: company.id).activated).to be_falsey
      end
    end

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { patch :deactivate }

      its(:code) { is_expected.to eq '401' }
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is super admin' do
      let(:login_user) { create :user, company: company, role: 'superadmin' }
      subject { delete :destroy }

      its(:code) { is_expected.to eq '200' }
      it 'does not persisted anymore' do
        is_expected
        expect(Company.find_by(id: company.id)).to be_nil
      end
    end

    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { patch :destroy }

      its(:code) { is_expected.to eq '401' }
    end
  end
end
