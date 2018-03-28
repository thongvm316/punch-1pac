# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserCreateForm, type: :model do
  describe 'validate' do
    let(:avatar) { fixture_file_upload('images/image.png', 'image/png') }
    let(:company) { create :company, :with_default_group }
    let(:current_user) { create :user, company: company, role: 'superadmin' }

    context 'group validate' do
      let(:user_params) { attributes_for(:user).merge(avatar: avatar) }

      it do
        form = UserCreateForm.new(user_params, current_user)
        form.save
        expect(form.error_messages).to eq(group: [I18n.t('errors.messages.blank')])
      end
    end
  end
end
