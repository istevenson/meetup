class GroupsController < ApplicationController

  def show
    secret_id = params[:secret_id]
    @group = Group.where("secret_id='#{secret_id}'").first
    if @group.blank?
      redirect_to :controller => 'public', :action => 'index'
    else
      @group.spottings
    end

  end

  def create
    @group = Group.new
    @group.save

    render :json => {}
  end

  def update
    @group = Group.where("secret_id='#{secret_id}").first
    respond_to do |format|
      if group.update
        format.html
        format.json { render json: @group }
      end
    end
  end
end
