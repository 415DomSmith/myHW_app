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
  	@submissions_for_course = @user.submissions.where(course_id: @course.id)

  	render json: @submissions_for_course, status: :ok
  	
  end
  
end