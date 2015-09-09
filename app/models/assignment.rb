class Assignment < ActiveRecord::Base

	has_many :assignment_courses, dependent: :destroy
	has_many :courses, through: :assignment_courses

	has_many :assignment_documents, dependent: :destroy
	has_many :documents, through: :assignment_documents

	has_many :submissions
end
