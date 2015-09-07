class AssignmentDocument < ActiveRecord::Base
  belongs_to :document
  belongs_to :assignment
end
