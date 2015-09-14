class CoursesController < ApplicationController
	
	def create
		# Make a new instance of a course
		@course = Course.new(course_params)

		# Set teacher, add it to user's courses, put it into a school
		@course.teacherId = current_user.id
		current_user.courses << @course
		@course.schools << current_user.schools[0]

		# Save the course
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
