class CreateSpottings < ActiveRecord::Migration
  def change
    create_table :spottings do |t|
      t.column :users_name, :string
      t.column :lat, :string
      t.column :lon, :string
      t.timestamps
    end
  end
end
