class DocumentsController < ApplicationController
	
	def index
		# @documents = Document.all
		# render json: @documents, status: :ok
	end

	def show
		render json: @documents, status: :ok
	end

	def new
		@document = Document.new
	end

	def create
		@document = Document.new(document_params)

    if @document.save
      render json: @documents, status: :created 
    else
      render json: @document.errors, status: :unprocessable_entity 
    end
	end

	def update
    if @document.update(document_params)
      render json: @document, status: :ok
    else
      render json: @document.errors, status: :unprocessable_entity
    end
	end

  def destroy
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
      params.require(:document).permit(:attach_file_size, :attach_content_type,:attach_updated_at, :google_drive_url )
    end

end
