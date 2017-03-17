class AddIndexToAuthentications < ActiveRecord::Migration[5.0]
  def change
    add_index :authentications, :provider, unique: true
    add_index :authentications, :uid, unique: true
  end
end
