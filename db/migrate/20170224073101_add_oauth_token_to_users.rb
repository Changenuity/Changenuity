class AddOauthTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_expires_at, :datetime
    add_column :users, :provider, :string
    add_column :users, :uid, :string
  end
end
