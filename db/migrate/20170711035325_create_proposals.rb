class CreateProposals < ActiveRecord::Migration[5.0]
  def change
    create_table :proposals do |t|
      t.references :user, foreign_key: true
      t.references :project, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
