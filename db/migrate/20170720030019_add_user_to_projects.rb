class AddUserToProjects < ActiveRecord::Migration[5.0]
  def change
    add_reference :projects, :user, foreign_key: true
  end
end
