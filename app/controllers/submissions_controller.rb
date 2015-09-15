class SubmissionsController < ApplicationController
	def create
		@assignment = Assignment.find(params["assignment_id"])
		@submission = @assignment.submissions.new(submission_params)
		current_user.submissions << @submission

		binding.pry
		if @submission.save
		  render json: @submission, status: :created
		else
		  render json: @submission.errors, status: :unprocessable_entity
		end
		
	end


private
	def set_submission
		@submission = Submission.find(params["id"])
		
	end

	def submission_params
		params.require(:submission).permit(:score, :max, :answer, :submission_link)
		
	end
end
