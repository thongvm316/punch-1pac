# frozen_string_literal: true

Rails.application.routes.draw do
  get 'healthcheck' => 'healthcheck#index', defaults: { format: :json }
  post 'login' => 'sessions#create', defaults: { format: :json }
  delete 'logout' => 'sessions#destroy', defaults: { format: :json }
end
