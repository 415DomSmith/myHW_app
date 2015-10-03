class Course < ActiveRecord::Base

	has_many :course_schools, dependent: :destroy
	has_many :schools, through: :course_schools
	
	has_many :course_users, dependent: :destroy
	has_many :users, through: :course_users 

	has_many :assignments

	has_many :announcements

	# def self.to_csv
	# 	attributes = %w{id name assignment_title score max}
 #  	CSV.generate(headers: true) do |csv|
 #    	csv << attributes
 #    	all.each do |assignment|
 #      	csv << [assignment.id, assignment.name, assignment.assignment_title, assignment.score, assignment.max]
 #    	end
 #  	end
	# end


def self.to_csv(foo_attributes = column_names, bar_attributes = bar.column_names, options = {})

  CSV.generate(options) do |csv|
    csv.add_row foo_attributes + bar_attributes

    all.each do |foo|

      values = foo.attributes.slice(*foo_attributes).values

      if foo.contact_details
        values += foo.contact_details.attributes.slice(*bar_attributes).values
      end

      csv.add_row values
    end
  end
end