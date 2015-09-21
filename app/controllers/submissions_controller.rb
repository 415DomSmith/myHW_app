class SubmissionsController < ApplicationController
	before_action :set_submission, only: [:show, :edit, :update, :destroy]
	def create
		@assignment = Assignment.find(params["assignment_id"])
		@submission = @assignment.submissions.new(submission_params)
		@submission.assignment_title = @assignment.title
		@submission.course_id = @assignment.course.id
		@submission.name = current_user.name
		current_user.submissions << @submission

		# binding.pry
		if @submission.save
		  render json: @submission, status: :created
		else
		  render json: @submission.errors, status: :unprocessable_entity
		end
	end

	def show
		# binding.pry
		render json: @submission, status: :ok
		
	end

	def update
		# binding.pry
		if @submission.update(submission_params)
			# binding.pry
			render json: @submission, status: :ok
		else
			render json: @submission.errors, status: unprocessable_entity
		end
	end

	def destroy
		@submission.destroy
		render json: @submission, status: :ok
	end


private
	def set_submission
		@submission = Submission.find(params["id"])
		
	end

	def submission_params
		params.require(:submission).permit(:score, :max, :answer, :name, :submission_link)
		
	end
end
