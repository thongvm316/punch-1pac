# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include Banken

  rescue_from Banken::NotAuthorizedError, with: :unauthorized

  before_action :current_company
  before_action :authenticate_user!
  before_action :ip_address_user!
  before_action :set_timezone
  before_action :set_locale

  after_action :verify_authorized

  private

  def set_timezone
    Time.zone = current_company.timezone
  end

  def set_locale
    I18n.locale = current_user.language
  end
end
