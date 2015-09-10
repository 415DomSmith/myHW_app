Rails.application.routes.draw do
  	mount_devise_token_auth_for 'User', at: 'api/auth'


  	root 'statics#index'
    # get "/omniauth/:provider/callback" => 'sessions#create'
end