class AddCategoryAndTypeIdsToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :type_id, :integer
    add_column :projects, :category_id, :integer
  end
end
