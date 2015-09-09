class AssignmentDocument < ActiveRecord::Base
  belongs_to :assignment
  belongs_to :document
end
