class Document < ActiveRecord::Base

	belongs_to :user

  has_many :assignment_documents, dependent: :destroy
	has_many :assignments, through: :assignment_documents

#### PAPERCLIP STUFF #####
	has_attached_file :attachment, 
	# s3_permissions: private,
	:storage => :s3,
	# :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
	:s3_credentials => "/#{Rails.root}/config/s3.yml",
	# :s3_credentials => "/config/s3.yml",
	:path => ":attachment/:id/",
	:bucket => 'myhwapp' 
	validates_attachment_content_type :attachment, :content_type => "application/pdf", :default_url => ""

	

	
	# :storage => :s3,
 #    :s3_credentials => "#{RAILS_ROOT}/config/s3.yml",
 #    :path => ":attachment/:id/:style.:extension",
 #    :bucket => 'myhwapp'
### TODO- ADD MORE ACCEPTED FILE TYPES ###	

### FORMATS THE JSON FROM OUR BACK END TO ALLOW PAPERCLIPS URL PROPERTY TO BE ADDED AND SENT TO OUR ANGULAR FRONT-END. MORE JSON KEY's CAN BE CREATED / ADDED IF NEED BE. ###
	# def as_json (options={})
	# 	{
	# 	 id: self.id,	
	# 	 user_id:  self.user_id, 
	# 	 local_file_url: self.attachment.url,
	# 	 attachment_file_name: self.attachment_file_name, 
	# 	 attachment_content_type: self.attachment_content_type, 
	# 	 attachment_file_size: self.attachment_file_size, 
	# 	 attachment_updated_at: self.attachment_updated_at,
	# 	 google_drive_url: self.google_drive_url,
	# 	 google_drive_Id: self.google_drive_Id,
	# 	 google_doc_name: self.google_doc_name,
	# 	 drive_parent_id: self.drive_parent_id,
	# 	 file_type: self.file_type,
	# 	 description: self.description 
	# 	}
	# end


   
end   
    