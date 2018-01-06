# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(SubdomainConstraint) do
    get '(*path)' => 'spa#index'

    post   'login'  => 'token#create'
    delete 'logout' => 'token#destroy'

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
end
