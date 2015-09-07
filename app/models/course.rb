class Course < ActiveRecord::Base
	has_many :course_students, dependent: :destroy
	has_many :students, through: :course_students
	has_many :assignments
	
	belongs_to :teacher
end
