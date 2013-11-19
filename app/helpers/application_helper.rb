module ApplicationHelper
  def get_all_spottings_json
    all_spottings = Spotting.all
    ret_arr = []
    all_spottings.each do |s|
      if s
        ret_arr << s.attributes
      end
    end
    ret_arr.to_json.html_safe
  end
end
