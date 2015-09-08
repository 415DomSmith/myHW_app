class Student < ActiveRecord::Base
has_many :course_students, dependent: :destroy
has_many :courses, through: :course_students

has_many :grade_students, dependent: :destroy
has_many :grades, through: :grade_students

has_many :assignment_students, dependent: :destroy
has_many :assignments, through: :assignment_students

end
