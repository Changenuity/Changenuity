Rails.application.routes.draw do
  root  'static_pages#home'
  get   '/home',    to: 'static_pages#home'
  get   '/about',   to: 'static_pages#tba'
  get   '/contact', to: 'static_pages#tba'
  get   '/privacy', to: 'static_pages#tba'
  get   '/tos',     to: 'static_pages#tba'
  get   '/tba',     to: 'static_pages#tba'
  get   '/post',    to: 'projects#new'
  post  '/post',    to: 'projects#create'
  get   '/browse',  to: 'projects#index'
  match '/users/:id/finish_signup', to: 'users#finish_signup', via: [:get, :patch], as: :finish_signup

  get   '/proposals', to: 'proposals#index'
  resources  :projects do
    resources  :proposals
  end
  
  resources  :tags, only: [:index, :show]
  devise_for :users, path: '',
    controllers: {omniauth_callbacks: 'users/omniauth_callbacks'},
    path_names: {sign_in: 'top_secret_sign_in', sign_up: 'top_secret_sign_up'}
  get '/users/:username', to: 'users#show'
  resources :users, :only => [:index, :show]
end
