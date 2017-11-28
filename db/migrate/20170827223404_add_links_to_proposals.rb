class AddLinksToProposals < ActiveRecord::Migration[5.0]
  def change
    add_column :proposals, :website, :string
    add_column :proposals, :github, :string
  end
end
