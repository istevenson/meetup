class AddLocationToSpottings < ActiveRecord::Migration
  def change
    add_column :spottings, :location, :string
  end
end
