class AddRecruitingToProjects < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :recruiting, :boolean
  end
end
