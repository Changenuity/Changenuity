Rails.application.routes.draw do
  root  'static_pages#home'
  get   '/home',    to: 'static_pages#home'
  get   '/about',   to: 'static_pages#about'
  get   '/contact', to: 'static_pages#contact'
  get   '/privacy', to: 'static_pages#privacy'
  get   '/tos',     to: 'static_pages#tos'
  get   '/post',    to: 'projects#new'
  post  '/post',    to: 'projects#create'
  get   '/browse',  to: 'projects#index'
  match '/users/:id/finish_signup', to: 'users#finish_signup', via: [:get, :patch], as: :finish_signup
  resources  :projects do
    resources  :proposals
  end
  resources  :tags, only: [:index, :show]
  devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}
  get  '/users',    to: 'users#index'
  get  '/users/:username',to: 'users#show'
  resources :users, :only => [:show]
end
