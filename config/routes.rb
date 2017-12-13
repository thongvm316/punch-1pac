# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :v1, defaults: { format: :json } do
    post   'login'  => 'sessions#login'
    delete 'logout' => 'sessions#logout'

    resources :users
    post 'user/import_csv' => 'users#import_csv'

    resources :sessions, only: %i[index destroy]

    resource :companies, only: %i[update destroy] do
      collection do
        match 'setup_rules', via: %i[patch put]
        match 'deactivate', via: %i[patch put]
      end
    end

    resources :announcements, only: %i[index show] do
      post 'read' => 'read_announcements#create', on: :member
      get  'latest', on: :collection
    end

    resources :business_days, only: %i[index create update destroy], constraints: { id: /\d+/ }
    resources :allowed_ips, only: %i[index create update destroy], constraints: { id: /\d+/ }
    resources :departments, only: %i[index show create update destroy], constraints: { id: /\d+/ }
  end
end
