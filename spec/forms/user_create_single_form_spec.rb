# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserCreateSingleForm, type: :model do
  describe 'validate' do
    let(:avatar) { fixture_file_upload('images/image.png', 'image/png') }
    let(:company) { create :company, :with_default_group }
    let(:current_user) { create :user, company: company, role: 'superadmin' }

    context 'group validate' do
      let(:user_params) do
        user_params = attributes_for(:user)
        user_params[:permission_ids] = user_params[:user_permissions_attributes].map { |id| id[:permission_id] }
        user_params.delete(:user_permissions_attributes)
        user_params[:avatar] = avatar
        user_params
      end
      it do
        form = UserCreateSingleForm.new(user_params, current_user)
        form.save
        expect(form.error_messages).to eq(group: [I18n.t('errors.messages.invalid')])
      end
    end
  end
end
