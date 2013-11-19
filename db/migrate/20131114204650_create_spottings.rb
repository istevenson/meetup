class CreateSpottings < ActiveRecord::Migration
  def change
    change_table :spottings do |t|
      t.column :spotting_id, :integer
      t.column :user_name, :string
      t.column :lat, :float
      t.column :lon, :float
      t.timestamps
    end
  end
end
