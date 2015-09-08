class Course < ActiveRecord::Base
	has_many :course_students, dependent: :destroy
	has_many :students, through: :course_students


	has_many :assignment_courses, dependent: :destroy
	has_many :assignments, through: :assignment_courses
	belongs_to :teacher
end
