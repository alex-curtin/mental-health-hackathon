class ChangeColumnInEntries < ActiveRecord::Migration[5.2]
  def change
    rename_column :entries, :type, :category 
  end
end
