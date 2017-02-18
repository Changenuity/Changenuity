class AddIndexTo < ActiveRecord::Migration[5.0]
  def change
    # add an index on the email column of the users table, enforce uniqueness
    add_index :users, :email, unique: true
  end
end
