# frozen_string_literal: true

module AppErrors
  extend ActiveSupport::Concern

  class Error403 < StandardError; end
  class Error409 < StandardError; end
  class Error500 < StandardError; end

  class InvalidResetPwdToken < StandardError; end
  class ExpiredResetPwdToken < StandardError; end
end
