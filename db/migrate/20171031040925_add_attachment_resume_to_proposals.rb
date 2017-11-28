class AddAttachmentResumeToProposals < ActiveRecord::Migration[5.0]
  def self.up
    change_table :proposals do |t|
      t.attachment :resume
    end
  end

  def self.down
    remove_attachment :proposals, :resume
  end
end
