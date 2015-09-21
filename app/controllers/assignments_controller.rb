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

		# gives all users of the class the assignment
		if @assignment.save
			@course.users.each do |r|
				# @user = User.find(r.id)
				r.assignments << @assignment
			end
		  render json: @assignment, status: :created
		else
		  render json: @assignment.errors, status: :unprocessable_entity
		end
		
	end


	def show
		
		@documents = @assignment.documents
		@submissions = @assignment.submissions
		# binding.pry
		render json: { 	:assignment => @assignment, 
						:documents => @documents, 
						:submissions => @submissions}, status: :ok
		
	end

	def update	
		@assignment.documents = [];
		if params["assignment"]["documents"]	
			params["assignment"]["documents"].each do |key, value|	
				if value != false
					@document = Document.find(value)
					@assignment.documents << @document
				end
			end
		end	
		if @assignment.update(assignment_params)
			# binding.pry
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
