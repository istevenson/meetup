class AgainFixColumnName < ActiveRecord::Migration
  def change
    change_table(:spottings) do |t|
      t.remove :string
      t.column :lat, :string
      t.column :lon, :string
    end
  end
end
