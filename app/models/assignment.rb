class Assignment < ActiveRecord::Base

	# belongs_to :course
	has_many :assignment_courses, dependent: :destroy
	has_many :courses, through: :assignment_courses

	has_many :assignment_students, dependent: :destroy
	has_many :students, through: :assignment_students

	has_many :assignment_documents, dependent: :destroy
	has_many :documents, through: :assignment_documents

	has_many :grades
end
