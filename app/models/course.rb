class Course < ActiveRecord::Base

	
	# NEEDS has_many :course_users, dependent: :destroy
	# NEEDS has_many :users, through: :course_users 

	has_many :assignment_courses, dependent: :destroy
	has_many :assignments, through: :assignment_courses


end
