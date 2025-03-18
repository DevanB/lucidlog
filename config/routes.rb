Rails.application.routes.draw do
  get "dashboard" => "app_pages#dashboard", as: :dashboard

  # Authentication
  resources :users, only: [ :new, :create ], path: "register", path_names: { new: "" }
  resources :passwords, only: [ :new, :create ], path: "forgot-password", path_names: { new: "" }
  resources :passwords, only: [ :edit, :update ], path: "reset-password", path_names: { edit: "" }, param: :token
  resources :sessions, only: [ :new, :create ], path: "login", path_names: { new: "" }
  delete "logout" => "sessions#destroy", as: :delete_session

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
