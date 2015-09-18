class CoursesController < ApplicationController
	before_action :set_course, only: [:show, :edit, :update, :destroy]
	def show
		# binding.pry
		@assignments = @course.assignments
		@enrolled_students = @course.users

		#Find the school to find its users so that you can send that to the edit of courses
		@school = @course.schools[0]
		@students = @school.users



		render json: { 	:course => @course, 
						:assignments => @assignments, 
						:students => @students, 
						:enrolled_students => @enrolled_students
						}, status: :ok
	end

	def update
		# binding.pry
		@course.users = []
		course_params["ids"].each do |value|
			if value.is_a? Integer
				student = User.find(value)
				@course.users << student
			end
		end

		# course_params.delete("ids")
		@course.name = course_params["name"]
		@course.subject = course_params["subject"]
		# binding.pry
		if @course.save
		  render json: @course, status: :ok
		else
		  render json: @course.errors, status: :unprocessable_entity
		end
		
	end
	
	def create
		# Make a new instance of a course
		@course = Course.new(course_params)

		# course_params.id.each

		params["ids"].each do |value|
			# binding.pry
			if value.is_a? Integer
				student = User.find(value)
				@course.users << student
				# binding.pry
			end
		end

		# Set teacher, add it to user's courses, put it into a school
		@course.teacherId = current_user.id
		# current_user.courses << @course
		@course.schools << current_user.schools[0]
		# binding.pry
		# Save the course
		if @course.save
		  render json: @course, status: :created
		else
		  render json: @course.errors, status: :unprocessable_entity
		end
	end

	def destroy
		# binding.pry
		@course.destroy
		render json: @course, status: :ok
		
	end

private

	def course_params
	  params.require(:course).permit(:name, :subject, ids: [])
	end

	def set_course
		@course = Course.find(params[:id])
		
	end
end
