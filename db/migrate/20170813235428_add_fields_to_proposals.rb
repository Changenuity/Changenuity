class AddFieldsToProposals < ActiveRecord::Migration[5.0]
  def change
    add_column :proposals, :reason, :text
    add_column :proposals, :passions, :text
    add_column :proposals, :skills, :text
    add_column :proposals, :work, :text
    add_column :proposals, :commitment, :string
    add_column :proposals, :estimation, :string
    add_column :proposals, :linkedin, :string

    remove_column :proposals, :content, :text
  end
end
