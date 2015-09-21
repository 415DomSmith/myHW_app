class AnnouncementsController < ApplicationController
	before_action :set_announcement, only: [:show, :update, :destroy]

	def create
		# binding.pry
		@course = Course.find(params["course_id"])
		@announcement = @course.announcements.new(announcement_params)
		# binding.pry
		if @announcement.save
			render json: @announcement, status: :created
		else
			render json: @announcement.errors, status: :unprocessable_entity
		end
	end

	def show
		render json: @announcement, status: :ok
	end

	def update

		if @announcement.update(announcement_params)
			render json: @announcement, status: :ok
		else
			render json: @announcement.errors, status: :unprocessable_entity
		end
		
	end

	def destroy
		@announcement.destroy
		render json: @announcement, status: :ok
	end





private

		def set_announcement
			@announcement = Announcement.find(params[:id])
		end

		def announcement_params
		  params.require(:announcement).permit(:body, :title, :date)
		end
end
