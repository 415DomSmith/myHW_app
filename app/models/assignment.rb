class Assignment < ActiveRecord::Base
	belongs_to :course
	belongs_to :student

	has_many :documents
	has_many :grades
end
