class AddFormFieldsToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :form_fields, :string, array: true, default: []
  end
end
