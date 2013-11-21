class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :secret_id
      t.timestamps
    end
  end
end
