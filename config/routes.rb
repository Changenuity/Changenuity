Rails.application.routes.draw do
  root 'static_pages#home'
  get  '/about',   to: 'static_pages#about'
  get  '/contact', to: 'static_pages#contact'
  get  '/post',    to: 'projects#new'
  post '/post',    to: 'projects#create'
  resources :projects
end
