# frozen_string_literal: true

class SpaController < ApplicationController
  include Authenticable
  skip_before_action :authenticate_user

  def index; end
end
