class Document < ActiveRecord::Base

	belongs_to :user

  has_many :assignment_documents, dependent: :destroy
	has_many :assignments, through: :assignment_documents

#### PAPERCLIP STUFF #####
	has_attached_file :attachment
	validates_attachment_content_type :attachment, :content_type => "application/pdf" 
### TODO- ADD MORE ACCEPTED FILE TYPES ###	
end
