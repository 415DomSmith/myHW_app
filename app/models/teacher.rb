class Teacher < ActiveRecord::Base
	has_many :documents, dependent: :destroy
	has_many :courses, dependent: :destroy

end
