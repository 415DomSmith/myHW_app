Rails.application.routes.draw do
  	root 'statics#index'


	#Routes for devise login with Google
  	mount_devise_token_auth_for 'User', at: 'api/auth'

  	#Route for additional info path
  	get "/additional_info" => "statics#additional_info"

  	
    


    # get "/omniauth/:provider/callback" => 'sessions#create'

    
    #Routes for all resources
    scope '/api' do
      resources :schools, only: [:index]

      resources :courses, only: [:create, :show, :update, :destroy]

      resources :users, only: [:index, :show, :create, :update, :destroy] do
        resources :documents, only: [:index, :new, :show, :create, :update, :destroy], shallow: true
      end
    end ##END OF API SCOPE
end





#                   Prefix Verb   URI Pattern                                 Controller#Action
#                     root GET    /                                           statics#index
#         new_user_session GET    /api/auth/sign_in(.:format)                 devise_token_auth/sessions#new
#             user_session POST   /api/auth/sign_in(.:format)                 devise_token_auth/sessions#create
#     destroy_user_session DELETE /api/auth/sign_out(.:format)                devise_token_auth/sessions#destroy
#            user_password POST   /api/auth/password(.:format)                devise_token_auth/passwords#create
#        new_user_password GET    /api/auth/password/new(.:format)            devise_token_auth/passwords#new
#       edit_user_password GET    /api/auth/password/edit(.:format)           devise_token_auth/passwords#edit
#                          PATCH  /api/auth/password(.:format)                devise_token_auth/passwords#update
#                          PUT    /api/auth/password(.:format)                devise_token_auth/passwords#update
# cancel_user_registration GET    /api/auth/cancel(.:format)                  devise_token_auth/registrations#cancel
#        user_registration POST   /api/auth(.:format)                         devise_token_auth/registrations#create
#    new_user_registration GET    /api/auth/sign_up(.:format)                 devise_token_auth/registrations#new
#   edit_user_registration GET    /api/auth/edit(.:format)                    devise_token_auth/registrations#edit
#                          PATCH  /api/auth(.:format)                         devise_token_auth/registrations#update
#                          PUT    /api/auth(.:format)                         devise_token_auth/registrations#update
#                          DELETE /api/auth(.:format)                         devise_token_auth/registrations#destroy
#        user_confirmation POST   /api/auth/confirmation(.:format)            devise_token_auth/confirmations#create
#    new_user_confirmation GET    /api/auth/confirmation/new(.:format)        devise_token_auth/confirmations#new
#                          GET    /api/auth/confirmation(.:format)            devise_token_auth/confirmations#show
#  api_auth_validate_token GET    /api/auth/validate_token(.:format)          devise_token_auth/token_validations#validate_token
#         api_auth_failure GET    /api/auth/failure(.:format)                 devise_token_auth/omniauth_callbacks#omniauth_failure
#                          GET    /api/auth/:provider/callback(.:format)      devise_token_auth/omniauth_callbacks#omniauth_success
#                          GET    /api/auth/:provider(.:format)               redirect(301)
#          additional_info GET    /additional_info(.:format)                  statics#additional_info
#                  schools GET    /api/schools(.:format)                      schools#index
#                  courses POST   /api/courses(.:format)                      courses#create
#           user_documents GET    /api/users/:user_id/documents(.:format)     documents#index
#                          POST   /api/users/:user_id/documents(.:format)     documents#create
#        new_user_document GET    /api/users/:user_id/documents/new(.:format) documents#new
#                 document GET    /api/documents/:id(.:format)                documents#show
#                          PATCH  /api/documents/:id(.:format)                documents#update
#                          PUT    /api/documents/:id(.:format)                documents#update
#                          DELETE /api/documents/:id(.:format)                documents#destroy
#                    users GET    /api/users(.:format)                        users#index
#                          POST   /api/users(.:format)                        users#create
#                     user GET    /api/users/:id(.:format)                    users#show
#                          PATCH  /api/users/:id(.:format)                    users#update
#                          PUT    /api/users/:id(.:format)                    users#update
#                          DELETE /api/users/:id(.:format)                    users#destroy
#                          GET    /omniauth/:provider/callback(.:format)      devise_token_auth/omniauth_callbacks#redirect_callbacks
#         omniauth_failure GET    /omniauth/failure(.:format)                 devise_token_auth/omniauth_callbacks#omniauth_failure