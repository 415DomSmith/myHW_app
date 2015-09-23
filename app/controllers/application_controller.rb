class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_filter  :verify_authenticity_token

  def confirm_logged_in
    unless current_user

      @errors = {error: "You are not logged in!"}
      render json: @errors, status: :unauthorized
    end
  end

  def confirm_teacher
    unless current_user.isTeacher
      @errors = {error: "You are not a teacher!"}
      render json: @errors, status: :unauthorized
    end
  end



 protected
  def html_layout
    # check the request format
    if request.format.symbol == :html
      render "layouts/application"
    end
  end
end
