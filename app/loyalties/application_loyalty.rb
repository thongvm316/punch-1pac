# frozen_string_literal: true

class ApplicationLoyalty
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    @user.manager?
  end

  def show?
    @user.manager?
  end

  def create?
    @user.manager?
  end

  def new?
    create?
  end

  def update?
    @user.manager?
  end

  def edit?
    update?
  end

  def destroy?
    @user.manager?
  end
end
