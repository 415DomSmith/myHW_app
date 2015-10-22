class StaticsController < ApplicationController
  before_action :html_layout
  before_action :confirm_logged_in
  before_action :confirm_teacher, only: [:submissions_for_course]
  def index
  end

  def additional_info
  end

  def submissions_for_course

    @submissions_for_course = []
  	# Find user and course
  	@user = User.find(params["user_id"])
  	@course = Course.find(params["course_id"])

  	# Find the submissions of that user for that individual course
    if params["category"]
      if params["category"] == "All"
        @submissions_for_course = @user.submissions.where(course_id: @course.id)
      else
        # Find all of the assignments for a course in a given category
        @assignments = @course.assignments.where(category: params["category"])
        @assignments.each do |assignment|
          # Find all of the submissions for that assignment
          assignment.submissions.each do |submission|
            if submission.user_id == @user.id
              # Add them to the submissions for the course
              @submissions_for_course << submission
            end
          end
        end
      end
    else
      @submissions_for_course = @user.submissions.where(course_id: @course.id)
    end
  	

  	render json: @submissions_for_course, status: :ok
  	
  end





  
end