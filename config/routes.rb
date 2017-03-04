Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'static_pages#weebly'
  get  '/home',    to: 'static_pages#home'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/post',    to: 'projects#new'
  post '/post',    to: 'projects#create'
  get  '/browse',  to: 'projects#index'
  resources :projects
  resources :tags, only: [:index, :show]
end
