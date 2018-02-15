class AddCommitmentToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :commitment, :integer
  end
end
