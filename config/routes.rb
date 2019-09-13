Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/auth/login', to: 'authentication#login'
  get '/users/verify', to: 'users#verify'
  get '/entries/all', to: 'entries#show_all'

  resources :users do
    resources :entries do
      resources :comments
    end
  end
end
