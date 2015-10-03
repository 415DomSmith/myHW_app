class CoursesController < ApplicationController
	before_action :set_course, only: [:show, :edit, :update, :destroy]
	before_action :confirm_logged_in
	before_action :confirm_teacher, only: [:create, :update, :destroy]
	

	def index ### SERVES FILE OF COURSE INFO FOR DOWNLOAD
		
		@course = Course.find(params[:course_id])
		@assignments = @course.assignments.order(:created_at)
		# @students = @course.users
		@submissions = [] 
		
		@assignments.each do |assignment|
			submission = Submission.where("assignment_id" => assignment.id)
			@submissions << submission
		end
		binding.pry		
		respond_to do |format|

	    format.csv { send_data @submissions.to_csv }
	    # format.xls
  	end
	end

	def show
		# binding.pry

		if params["category"]
			if params["category"] == "All"
				@assignments = @course.assignments		
			else
				@assignments = @course.assignments.where(category: params["category"])
			end
		else
			@assignments = @course.assignments	
		end
		# @assignments = @course.assignments
		@enrolled_students = @course.users

		#Find the school to find its users so that you can send that to the edit of courses
		@school = @course.schools[0]
		@students = @school.users
		@announcements = @course.announcements



		render json: { 	:course => @course, 
						:assignments => @assignments, 
						:students => @students, 
						:enrolled_students => @enrolled_students,
						:announcements => @announcements
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
		@course.iframe = course_params["iframe"]
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
		@course.iframe = course_params["iframe"]
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
	  params.require(:course).permit(:name, :subject, :iframe, ids: [])
	end

	def set_course
		@course = Course.find(params[:id])
		
	end
end
