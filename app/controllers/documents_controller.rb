class DocumentsController < ApplicationController

	
  def index
		@documents = current_user.documents #### ONLY GETTING CURRENT USERS DOCUMENTS ###
		render json: @documents, status: :ok
  end

	def show ### NOT SURE WE NEED SHOW ###
    @documents = current_user.documents
		render json: @documents, status: :ok
	end

	def new
		@document = Document.new
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

	def update ### NOT SURE HOW UPDATE WILL WORK ###
    if @document.update(document_params)
      render json: @document, status: :ok
    else
      render json: @document.errors, status: :unprocessable_entity
    end
	end

  def destroy ### TODO - FIGURE OUT DESTROY FOR PAPECLIP FILES... AND GOOGLE DRIVE FILES... SEPARATELY ###
    @document.destroy
    respond_to do |format|
      format.html { redirect_to documents_url, notice: 'Document was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def document_params
      params.require(:document).permit(:attachment)
    end



end