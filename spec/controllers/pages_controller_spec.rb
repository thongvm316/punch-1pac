# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe 'GET #top' do
    subject { get :top }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:top) }
  end

  describe 'GET #help' do
    subject { get :help }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:help) }
  end

  describe 'GET #terms' do
    subject { get :terms }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:terms) }
  end

  describe 'GET #privacy' do
    subject { get :privacy }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:privacy) }
  end

  describe 'GET #page_404' do
    subject { get :page_404, params: { path: 'dsfsdfdsfsd' } }

    it { is_expected.to have_http_status(:success) }
    it { is_expected.to render_template(:page_404) }
  end
end
