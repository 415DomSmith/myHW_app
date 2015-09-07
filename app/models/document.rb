class Document < ActiveRecord::Base
	belongs_to :teacher
	belongs_to :assignment
end
