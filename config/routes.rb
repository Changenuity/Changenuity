Rails.application.routes.draw do
  root   'static_pages#weebly'
  get    '/home',    to: 'static_pages#home'
  get    '/about',   to: 'static_pages#about'
  get    '/contact', to: 'static_pages#contact'
  get    '/post',    to: 'projects#new'
  post   '/post',    to: 'projects#create'
  get    '/browse',  to: 'projects#index'
  get    '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get    '/logout',  to: 'sessions#destroy'
  delete '/logout',  to: 'sessions#destroy'
  resources :projects
  resources :users
end
