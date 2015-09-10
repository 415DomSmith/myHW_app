class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable, :omniauth_providers => [:google_oauth2]
  include DeviseTokenAuth::Concerns::User
end
