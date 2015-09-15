class Assignment < ActiveRecord::Base

	belongs_to :course

	has_many :assignment_documents, dependent: :destroy
	has_many :documents, through: :assignment_documents

	has_many :submissions
end


##TODO - Teachers can assign homework to a class. 

## Match students to a course
## Teachers can attach a document to an asssignment
## Go through each user in a course and put the assignment ID in the student.assignments 
## 