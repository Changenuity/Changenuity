class Proposal < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :reason, length: { maximum: 65535 }
  validates :passions, length: { maximum: 65535 }
  validates :skills, length: { maximum: 65535 }
  validates :work, length: { maximum: 65535 }
  validates :commitment, length: { maximum: 255 }
  validates :estimation, length: { maximum: 255 }
  validates :website, length: { maximum: 255 }
  validates :linkedin, length: { maximum: 255 }
  validates :github, length: { maximum: 255 }
  has_attached_file :resume, s3_protocol: :https
  validates_attachment_content_type :resume, 
    content_type: ['application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    message: 'file type is not allowed (only pdf/doc/docx)'
end
