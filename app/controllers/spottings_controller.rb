class SpottingsController < ApplicationController
  # before_action :set_spotting

  def show

  end

  def create
    @spotting = Spotting.new(spottings_params)
    new_group = false
    if !params.has_key?(:group_id)
      @group = Group.create
      group_id = @group.id
      new_group = true
    else
      group_id = params[:group_id]
    end

    @spotting[:group_id] = group_id
    @spotting.save

    if new_group
      render :json => {:new_group_id => @group.secret_id}
    end
  end

  private
  def spottings_params
    params.permit(:users_name, :lat, :lon, :group_id, :id)
  end

  def update
    respond_to do |format|
      if @spotting.update
        format.html
        format.json { render json: @spotting }
      end
    end
  end

end
