# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :v1, defaults: { format: :json } do
    post 'login' => 'sessions#create'
    delete 'logout' => 'sessions#destroy'
  end
end
