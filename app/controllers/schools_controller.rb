class SchoolsController < ApplicationController
	# GET /schools
	def index
	  @schools = School.all
	  render json: @schools, status: :ok
	end
end
