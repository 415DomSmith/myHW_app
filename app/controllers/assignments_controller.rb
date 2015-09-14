class AssignmentsController < ApplicationController
	before_action :set_assignment, only: [:show, :edit, :update, :destroy]
	def create
		
		@course = Course.find(params["course_id"])
		@assignment = @course.assignments.new(assignment_params)
		# binding.pry
		if @assignment.save
		  render json: @assignment, status: :created
		else
		  render json: @assignment.errors, status: :unprocessable_entity
		end
		
	end


	def show
		# binding.pry
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
