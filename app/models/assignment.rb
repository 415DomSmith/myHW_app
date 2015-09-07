class Assignment < ActiveRecord::Base
	belongs_to :course
	belongs_to :student

	has_many :assignment_documents, dependent: :destroy
	has_many :documents, through: :assignment_documents

	has_many :grades
end
