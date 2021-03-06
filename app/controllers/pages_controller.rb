# frozen_string_literal: true

class PagesController < ApplicationController
  layout 'page'

  def top; end

  # rubocop:disable Naming/AccessorMethodName
  def get_started; end
  # rubocop:enable Naming/AccessorMethodName

  def help; end

  def terms; end

  def privacy; end

  def features; end

  def contact; end

  def page_403; end
end
