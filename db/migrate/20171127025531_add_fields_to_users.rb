class AddFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :location, :string
    add_column :users, :biography, :text
    add_column :users, :experience, :text
    add_column :users, :organization, :text
    add_column :users, :passions, :text
    add_column :users, :skills, :text
    add_column :users, :work, :text
  end
end
