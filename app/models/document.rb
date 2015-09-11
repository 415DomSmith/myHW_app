class Document < ActiveRecord::Base

	belongs_to :user

  has_many :assignment_documents, dependent: :destroy
	has_many :assignments, through: :assignment_documents


	has_attached_file :attach
	validates_attachment_content_type :attach, content_type: { content_type: "application/pdf" }
end
