# frozen_string_literal: true

module Pagination
  extend ActiveSupport::Concern

  def pager(object)
    {
      current_page: object.current_page,
      next_page: object.next_page,
      prev_page: object.prev_page,
      per_page: params[:per_page].to_i || Kaminari.config.default_per_page,
      total_pages: object.total_pages
    }
  end
end
