# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(SubdomainConstraint) do
    post 'logout' => 'auth#destroy'
    post '/'      => 'auth#create'
    get  '/'      => 'auth#new', as: :login

    get  'password_reset/:token' => 'password_reset#edit', as: :edit_password_reset
    post 'password_reset/:token' => 'password_reset#update'
    get  'password_reset'        => 'password_reset#new'
    post 'password_reset'        => 'password_reset#create'

    get '*path' => 'dashboard#index'

    namespace :api, defaults: { format: :json }, constraints: { id: /\d+/ } do
      namespace :v1 do
        resources :users do
          post 'create_multi', on: :collection
        end

        resources :custom_holidays, only: %i[index create update destroy]

        resources :holidays, only: %i[index] do
          collection do
            post 'import'
            delete 'company_destroy'
          end
        end

        resources :groups, only: %i[index show create update destroy]
        resources :permissions, only: %i[index]

        resources :sessions, only: %i[index destroy]

        resource :company, only: %i[update destroy] do
          collection do
            match 'setup_rules', via: %i[patch put]
            match 'deactivate', via: %i[patch put]
          end
        end

        resources :announcements, only: %i[index show] do
          post 'read' => 'read_announcements#create', on: :member
          get  'latest', on: :collection
        end

        resources :attendances, only: %i[create update]
        resources :requests, only: %i[index create update destroy] do
          member do
            post 'approve' => 'requests#approve'
            post 'reject'  => 'requests#reject'
            post 'read'    => 'read_requests#create'
          end
        end
        resources :business_days, only: %i[index create update destroy]
        resources :allowed_ips, only: %i[index create update destroy]
        resources :departments, only: %i[index show create update destroy]
      end
    end
  end

  root to: 'statics#top'

  get 'about'   => 'statics#about'
  get 'tos'     => 'statics#tos'
  get 'privacy' => 'statics#privacy'

  devise_for :admins, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end
