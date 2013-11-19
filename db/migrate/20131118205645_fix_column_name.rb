class FixColumnName < ActiveRecord::Migration
  def change
    change_table(:spottings) do |t|
      t.remove :location
      t.column :lat, :float
      t.column :lon, :float
    end
  end
end
