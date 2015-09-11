class CoursesController < ApplicationController
	# def create
	#   @contact = Contact.new(contact_params)

	#   if @contact.save
	#     render json: @contact, status: :created
	#   else
	#     render json: @contact.errors, status: :unprocessable_entity
	#   end
	# end

	def create
		@course = Course.new(course_params)
		@course.teacherId = current_user.id
		current_user.courses << @course
		binding.pry
		if @course.save
		  render json: @course, status: :created
		else
		  render json: @course.errors, status: :unprocessable_entity
		end
	end

private

	def course_params
	  params.require(:course).permit(:name, :subject)
	end
end
