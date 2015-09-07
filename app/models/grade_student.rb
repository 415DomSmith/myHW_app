class GradeStudent < ActiveRecord::Base
  belongs_to :grade
  belongs_to :student
end
