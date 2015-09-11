Rails.application.routes.draw do
  	root 'statics#index'


	#Routes for devise login with Google
  	mount_devise_token_auth_for 'User', at: 'api/auth'

  	#Route for additional info path
  	get "/additional_info" => "statics#additional_info"

  	
  	resources :documents, only: [:new, :show, :create, :update, :destroy] 
    # get "/omniauth/:provider/callback" => 'sessions#create'

    
    #Routes for all resources
    scope '/api' do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :schools, only: [:index]
      resources :courses, only: [:create]
    end
end