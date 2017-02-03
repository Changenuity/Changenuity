class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.date :date
      t.string :location
      t.text :description
      t.text :parameters
      t.text :references

      t.timestamps
    end
  end
end
