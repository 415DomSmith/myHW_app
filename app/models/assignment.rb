class Assignment < ActiveRecord::Base

	# belongs_to :course
	has_many :assignment_courses
	has_many :course, through: :assignment_courses

	belongs_to :student

	has_many :assignment_documents, dependent: :destroy
	has_many :documents, through: :assignment_documents

	has_many :grades
end
