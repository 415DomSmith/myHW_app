class Document < ActiveRecord::Base

	belongs_to :user

  has_many :assignment_documents, dependent: :destroy
	has_many :assignments, through: :assignment_documents

#### PAPERCLIP STUFF #####
	has_attached_file :attachment
	validates_attachment_content_type :attachment, :content_type => "application/pdf" 
### TODO- ADD MORE ACCEPTED FILE TYPES ###	

### FORMATS THE JSON FROM OUR BACK END TO ALLOW PAPERCLIPS URL PROPERTY TO BE ADDED AND SENT TO OUR ANGULAR FRONT-END. MORE JSON KEY's CAN BE CREATED / ADDED IF NEED BE. ###
	def as_json (options={})
		{local_file_url: self.attachment.url,  google_drive_url: self.google_drive_url, user_id:  self.user_id, attachment_file_name: self.attachment_file_name, attachment_content_type: self.attachment_content_type, attachment_file_size: self.attachment_file_size, attachment_updated_at: self.attachment_updated_at }
	end


   
end   
    