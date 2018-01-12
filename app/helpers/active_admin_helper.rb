# frozen_string_literal: true

module ActiveAdminHelper
  def countries
    %w[Vietnam Japan].map { |v| [v, v] }
  end

  def languages
    I18n.available_locales.map { |v| [v, v] }
  end

  def timezones
    ActiveSupport::TimeZone.all.map { |z| [z.tzinfo.name, z.tzinfo.name] }
  end
end
