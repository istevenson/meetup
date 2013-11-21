module ApplicationHelper
  # def get_all_spottings_json
    # all_spottings = Spotting.all
    # ret_arr = []
    # all_spottings.each do |s|
    #   if s
    #     ret_arr << s.attributes
    #   end
    # end
    # ret_arr.to_json.html_safe
  # end

  def get_my_group_spottings
    # my_group_spottings = Spotting.joins(:group).where("group_id = ?", params[:group_id])
    if @group
      my_group_spottings = @group.spottings


      ret_arr = []
      my_group_spottings.each do |spotting|
        if spotting
          ret_arr << spotting.attributes
        end
      end
      ret_arr.to_json.html_safe
    else
      return [].to_json.html_safe
    end
  end

  # def get_my_group_spottings
  #   my_group_spottings = Group.where("secret_id= ?", params[:secret_id]).first
  #   ret_arr = []
  #   my_group_spottings.each do |spotting|
  #     if spotting
  #       ret_arr << spotting.attributes
  #     end
  #   end
  #   ret_arr.to_json.html_safe
  # end

end
