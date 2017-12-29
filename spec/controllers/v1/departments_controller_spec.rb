# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::DepartmentsController, type: :controller do
  let(:company) { create :company }

  before { authenticate_user(login_user) }

  shared_examples 'a not found department' do
    its(:code) { is_expected.to eq '404' }
    its(:body) { is_expected.to be_json_as(response_404) }
  end

  describe 'GET #index' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }

      subject { get :index }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when company has departments' do
        let!(:departments) { create_list :department, 2, company: company }

        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(Array.new(2) { response_department }) }
      end

      context 'when company has not departments' do
        subject { get :index }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as([]) }
      end
    end
  end

  describe 'GET #show' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:department) { create :department, company: company }

      subject { get :show, params: { id: department.id } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when department is not exists' do
        subject { get :show, params: { id: 1 } }

        it_behaves_like 'a not found department'
      end

      context 'when department is exists' do
        let(:department) { create :department, company: company }

        subject { get :show, params: { id: department.id } }

        its(:code) { is_expected.to eq '200' }
        its(:body) { is_expected.to be_json_as(response_department) }
      end
    end
  end

  describe 'PUT #update' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:department) { create :department, company: company }

      subject { patch :update, params: { id: department.id, department: { name: 'new_name' } } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when department is not exists' do
        subject { patch :update, params: { id: 1 } }

        it_behaves_like 'a not found department'
      end

      context 'when department is exists' do
        let(:department) { create :department, company: company }

        context 'when params are valid' do
          subject { patch :update, params: { id: department.id, department: { name: 'new_name' } } }

          its(:code) { is_expected.to eq '200' }
          its(:body) { is_expected.to be_json_as(response_department) }
          it 'changes department.name' do
            is_expected
            expect(Department.find(department.id).name).to eq 'new_name'
          end
        end

        context 'when params are invalid' do
          subject { patch :update, params: { id: department.id, department: { name: '' } } }

          its(:code) { is_expected.to eq '422' }
          its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
        end
      end
    end
  end

  describe 'POST #create' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:department_params) { attributes_for(:department, company: company) }

      subject { post :create, params: { department: department_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when params are valid' do
        let(:department_params) { attributes_for(:department, company: company) }

        subject { post :create, params: { department: department_params } }

        its(:code) { is_expected.to eq '201' }
        its(:body) { is_expected.to be_json_as(response_department) }
      end

      context 'when params are invalid' do
        subject { post :create, params: { department: { company_id: company.id } } }

        its(:code) { is_expected.to eq '422' }
        its(:body) { is_expected.to be_json_as(response_422(name: Array)) }
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when login user is member' do
      let(:login_user) { create :user, company: company, role: 'member' }
      let(:department_params) { attributes_for(:department, company: company) }

      subject { post :create, params: { department: department_params } }

      its(:code) { is_expected.to eq '401' }
    end

    context 'when login user is admin' do
      let(:login_user) { create :user, company: company, role: 'admin' }

      context 'when department is not exists' do
        subject { delete :destroy, params: { id: 1 } }

        it_behaves_like 'a not found department'
      end

      context 'when department is exists' do
        let(:department) { create :department, company: company }

        subject { delete :destroy, params: { id: department.id } }

        its(:code) { is_expected.to eq '200' }
        it 'does not persisted anymore' do
          is_expected
          expect(Department.find_by(id: department.id)).to be_nil
        end
      end
    end
  end
end
