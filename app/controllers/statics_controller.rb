class StaticsController < ApplicationController
  before_action :html_layout
  before_action :confirm_logged_in
  before_action :confirm_teacher, only: [:submissions_for_course]
  def index
  end

  def additional_info
  	# binding.pry
  	
  end

  def submissions_for_course

    @submissions_for_course = []
  	# Find user and course
  	@user = User.find(params["user_id"])
  	@course = Course.find(params["course_id"])

  	# Find the submissions of that user for that individual course
    # binding.pry
    if params["category"]
      # @submissions_for_course = @user.submissions.where(course_id: @course.id, category: params["category"])
      if params["category"] == "All"
        @submissions_for_course = @user.submissions.where(course_id: @course.id)
      else
        @assignments = @course.assignments.where(category: params["category"])
        # binding.pry
        @assignments.each do |assignment|
          # binding.pry
          assignment.submissions.each do |submission|
            # binding.pry
            if submission.user_id == @user.id
              @submissions_for_course << submission
            end
          end
        end
      end
    else
      @submissions_for_course = @user.submissions.where(course_id: @course.id)
    end
  	

    # binding.pry
  	render json: @submissions_for_course, status: :ok
  	
  end





  
end