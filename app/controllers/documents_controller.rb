class DocumentsController < ApplicationController

  before_action :set_document, only: [:show, :edit, :update, :destroy]

  before_action :confirm_logged_in
  
  before_action :confirm_teacher, only: [:create, :index, :destroy]

	
  def index
		@documents = current_user.documents #### ONLY GETTING CURRENT USERS DOCUMENTS ###
		render json: @documents, status: :ok
  end


	def create
		# binding.pry

    @document = Document.new(document_params)
    @document.user_id = current_user.id ### SETTING OWNERSHIP OF CREATED DOC TO CURRENT USER ###
    if @document.save
      render json: @documents, status: :created ### TODO - SEND BACK AND DISPLAY AN 'UPLOAD COMPLETED' MSG ###
    else
      render json: @document.errors, status: :unprocessable_entity 
    end
	end


  def destroy ### TODO - FIGURE OUT DESTROY FOR PAPECLIP FILES... AND GOOGLE DRIVE FILES... SEPARATELY ###
    
    @document.destroy   
    render json: @assignment, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def document_params
      params.require(:document).permit(:attachment, :description, :drive_parent_id, :file_type, :google_doc_name, :google_drive_id, :google_drive_url)
    end



end
