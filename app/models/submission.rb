class Submission < ActiveRecord::Base

	has_many :submission_users, dependent: :destroy
	has_many :users, through: :submission_users 
	
	belongs_to :assignment

end
