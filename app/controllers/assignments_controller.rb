class AssignmentsController < ApplicationController
	before_action :set_assignment, only: [:show, :edit, :update, :destroy]
	
	def create
		
		@course = Course.find(params["course_id"])
		@assignment = @course.assignments.new(assignment_params)
	
		params["documents"].each do |key, value|
			# binding.pry
			if value != false
				@document = Document.find(value)
				@assignment.documents << @document
			end
		end	
		
		# binding.pry
		if @assignment.save
			@course.users.each do |r|
				if r.isTeacher != true
					@user = User.find(r.id)
					# @user.assignments << @assignment
				end
			end
		  render json: @assignment, status: :created
		else
		  render json: @assignment.errors, status: :unprocessable_entity
		end
		
	end


	def show
		# binding.pry
		@documents = @assignment.documents
		render json: {:assignment => @assignment, :documents => @documents}, status: :ok
		
	end

	def update
		if @assignment.update(assignment_params)
			render json: @assignment, status: :ok
		else
			render json: @assignment.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@assignment.destroy
		render json: @assignment, status: :ok
	end

private
	def set_assignment
		@assignment = Assignment.find(params["id"])
		
	end

	def assignment_params
		params.require(:assignment).permit(:title, :description, :due_date, :homework, :classwork, :class_participation, :quiz, :test, :project, :miscellaneous, :reading)
		
	end
end
