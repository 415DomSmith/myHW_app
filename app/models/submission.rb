class Submission < ActiveRecord::Base


	belongs_to :user
	belongs_to :assignment

end
