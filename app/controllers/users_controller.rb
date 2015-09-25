class UsersController < ApplicationController
	before_action :set_user, only: [:show, :update, :destroy]
	before_action :confirm_logged_in, except: [:destroy]
	# before_action :authenticate_user!

# CRUD on users

	def index
		
	end

	def show
		@courses = @user.courses
		@submissions = @user.submissions
		@assignments = @user.assignments
		@schools = @user.schools
		# binding.pry
		render json: {
						:user => @user,
						:courses => @courses,
						:submissions => @submissions,
						:assignments => @assignments,
						:schools => @schools
					}, status: :ok   
	end

	# def create
		
	# end

	def update
		# binding.pry
		@school = School.find(params["school"])
		@user.schools << @school
		@user.isNewUser = false
		if @user.update(user_params)
		  render json: @user, status: :ok
		else
		  render json: @user.errors, status: :unprocessable_entity
		end
		
	end

	def destroy
		@user.destroy
		render json: @user, status: :ok
		
	end

private

		def set_user
			@user = User.find(params[:id])
		end

		def user_params
		  params.permit(:isTeacher, :isFemale)
		end
end
