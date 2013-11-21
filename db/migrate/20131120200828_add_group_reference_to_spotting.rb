class AddGroupReferenceToSpotting < ActiveRecord::Migration
  def change
    add_reference :spottings, :group, index: true
  end
end
