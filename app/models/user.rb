class User < ActiveRecord::Base

	acts_as_copy_target
	has_many :documents

	has_many :course_users, dependent: :destroy
	has_many :courses, through: :course_users

	has_many :submissions

	has_many :school_users, dependent: :destroy
	has_many :schools, through: :school_users

  	has_many :assignment_users, dependent: :destroy
	has_many :assignments, through: :assignment_users
  
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable, :omniauth_providers => [:google_oauth2]
  include DeviseTokenAuth::Concerns::User
end
