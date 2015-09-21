class StaticsController < ApplicationController
  before_action :html_layout

  def index
  end

  def additional_info
  	# binding.pry
  	
  end

  def submissions_for_course

  	# Find user and course
  	@user = User.find(params["user_id"])
  	@course = Course.find(params["course_id"])

  	# Find the submissions of that user for that individual course
    # binding.pry
    # if params["category"]
    #   # @submissions_for_course = @user.submissions.where(course_id: @course.id, category: params["category"])
    #   @assignments = @course.assignments.where(params["category"]: true)
    #   @assignments.each do |assignment|
    #     assignment.submissions.each do | submission|
    #       if submission.user_id == params["user_id"]
    #         @submissions_for_course << submission
    #       end
    #     end
    #   end

    # else
      @submissions_for_course = @user.submissions.where(course_id: @course.id)
    # end
  	

    # binding.pry
  	render json: @submissions_for_course, status: :ok
  	
  end
  
end