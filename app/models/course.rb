class Course < ActiveRecord::Base

	has_many :course_schools, dependent: :destroy
	has_many :schools, through: :course_schools
	
	has_many :course_users, dependent: :destroy
	has_many :users, through: :course_users 

	has_many :assignments



end
