class Grade < ActiveRecord::Base
	has_many :grade_students, dependent: :destroy
	has_many :students, through: :grade_students

	belongs_to :assignment

end
