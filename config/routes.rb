Rails.application.routes.draw do
  	mount_devise_token_auth_for 'User', at: 'api/auth'


  	root 'statics#index'
  	get "/additional_info" => "statics#additional_info"

  	
  	resources :documents, only: [:new, :show, :create, :update, :destroy] 
    # get "/omniauth/:provider/callback" => 'sessions#create'
end