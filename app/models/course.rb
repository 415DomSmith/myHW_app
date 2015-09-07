class Course < ActiveRecord::Base
	has_many :course_students, dependent: :destroy
	has_many :students, through: :course_students


	has_many :assigment_courses, dependent: :destroy
	has_many :assignments, through: :assigment_courses
	belongs_to :teacher
end
