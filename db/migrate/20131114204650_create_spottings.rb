class CreateSpottings < ActiveRecord::Migration
  def change
    create_table :spottings do |t|
      t.column :spotting_id, :integer
      t.column :user_name, :string
      t.column :latitude, :string
      t.column :longitude, :string
      t.timestamps
    end
  end
end
