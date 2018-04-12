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

    namespace :api, defaults: { format: :json }, constraints: { id: /\d+/ } do
      namespace :v1 do
        resources :users, except: %i[new edit] do
          post 'create_multi', on: :collection
          match 'change_password', via: %i[patch put], on: :collection
        end

        resources :holidays, only: %i[index create update destroy] do
          post 'import', on: :collection
        end

        resources :groups, only: %i[index show create update destroy] do
          member do
            get 'report'
            post 'add_user'
            delete 'remove_user'
          end
        end
        resources :permissions, only: %i[index]

        resources :sessions, only: %i[index destroy]

        resource :company, only: %i[update destroy] do
          match 'deactivate', via: %i[patch put], on: :collection
        end

        resources :announcements, only: %i[index show] do
          post 'read' => 'read_announcements#create', on: :member
        end

        resources :attendances, only: %i[index create update] do
          collection do
            get 'chart' => 'attendances#chart'
            get 'calendar' => 'attendances#calendar'
            get 'today' => 'attendances#today'
          end
        end

        resources :requests, only: %i[index create update destroy] do
          member do
            post 'approve' => 'requests#approve'
            post 'reject'  => 'requests#reject'
            post 'read'    => 'read_requests#create'
          end
        end
        resources :business_days, only: %i[index create update destroy]
        resources :allowed_ips, only: %i[index create update destroy]

        resources :activities, only: %i[index]
        resources :notifications, only: %(index) do
          post 'read', on: :member
        end
      end
    end

    get '*path' => 'dashboard#index'
  end

  root to: 'statics#top'

  get 'about'   => 'statics#about'
  get 'tos'     => 'statics#tos'
  get 'privacy' => 'statics#privacy'

  devise_for :admins, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end
