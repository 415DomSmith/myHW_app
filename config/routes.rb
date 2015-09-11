Rails.application.routes.draw do
  	mount_devise_token_auth_for 'User', at: 'api/auth'


  	root 'statics#index'
  	get "/additional_info" => "statics#additional_info"
    # get "/omniauth/:provider/callback" => 'sessions#create'
    scope '/api' do
      resources :users, only: [:index, :show, :create, :update, :destroy]
    end
end