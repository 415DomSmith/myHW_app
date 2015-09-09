class Submission < ActiveRecord::Base

	# NEEDS has_many :submission_users, dependent: :destroy
	# NEEDS has_many :users, through: :submission_users 
	
	belongs_to :assignment

end
