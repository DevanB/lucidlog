Rails.application.routes.draw do
  get "register" => "users#new", as: :new_user
  post "register" => "users#create", as: :users
  get "forgot-password" => "passwords#new", as: :new_password
  get "reset-password" => "passwords#edit", as: :edit_password
  get "login" => "sessions#new", as: :new_session

  resources :passwords, only: %i[new create edit update], param: :token
  resource :session, only: %i[new create destroy]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "marketing_pages#home"
end
