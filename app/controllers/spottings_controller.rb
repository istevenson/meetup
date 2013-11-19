class SpottingsController < ApplicationController
  # before_action :set_spotting

  def show

  end


  def create
    @spotting = Spotting.new(spottings_params)
    @spotting.save

    render :json => {}
  end

  private
  def spottings_params
    params.permit(:users_name, :lat, :lon)
  end

  def update

    respond_to do |format|
      if @spotting.update
        format.html
        format.json { render json: @spotting}
      end
    end
  end

end
