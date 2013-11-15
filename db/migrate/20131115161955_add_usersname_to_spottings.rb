class AddUsersnameToSpottings < ActiveRecord::Migration
  def change
    add_column :spottings, :users_name, :string
  end
end
