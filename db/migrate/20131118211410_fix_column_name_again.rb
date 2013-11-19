class FixColumnNameAgain < ActiveRecord::Migration
    def change
    change_table(:spottings) do |t|
      t.remove :location
      t.rename :lat, :string
      t.rename :lon, :string
    end
  end
end
