class AssignmentCourse < ActiveRecord::Base
  belongs_to :course
  belongs_to :assignment
end
