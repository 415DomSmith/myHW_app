class UsersController < ApplicationController
	before_action :set_user, only: [:show, :update, :destroy]

# CRUD on users

	def index
		
	end

	def show
		render json: @user, status: :ok   
	end

	# def create
		
	# end

	def update
		binding.pry
		if @user.update(user_params)
		  render json: @user, status: :ok
		else
		  render json: @user.errors, status: :unprocessable_entity
		end
		
	end

	def destroy
		
	end

private

		def set_user
			@user = User.find(params[:id])
		end

		def user_params
		  params.permit(:isTeacher)
		end
end
