class SchoolsController < ApplicationController
	# GET /schools
	def index
	  @schools = School.all
	  render json: @schools, status: :ok
	end

	def show
		@school = School.find(params["id"])
		@users = @school.users
		render json: {:school => @school, :users => @users}
		
	end
end
