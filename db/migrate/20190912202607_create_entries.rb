class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.string :type
      t.string :title
      t.string :details
      t.integer :mood
      t.string :status
      t.boolean :self_care
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
