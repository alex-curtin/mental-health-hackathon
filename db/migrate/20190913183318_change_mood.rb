class ChangeMood < ActiveRecord::Migration[5.2]
  def change
    change_column :entries, :mood, :string
    change_column :users, :mood, :string
  end
end
