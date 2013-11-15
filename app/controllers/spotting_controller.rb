class SpottingsController < ApplicationController
  before_action :set_spotting

  def show
  end

  def create
    @spotting = Spotting.new
    respond_to do |format|
      format.html
      format.json { render json: @spotting}
    end
  end

  def update
    respond_to do |format|
      if @board.update
        format.html
        format.json { render json: @spotting}
      end
  end

  private
    def set_spotting
      @spotting = Spotting.find(params[:id])
    end

    def spottings_params
      params.require(:spotting).permit(:location, :user_name)
    end
end
