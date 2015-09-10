class School < ActiveRecord::Base
	
	has_many :course_schools, dependent: :destroy
	has_many :courses, through: :course_schools 

	has_many :school_users, dependent: :destroy
	has_many :users, through: :school_users
end
