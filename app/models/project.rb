class Project < ApplicationRecord

  has_attached_file :image, styles: { medium: '300x300>', thumb: '100x100>' }
  validates_attachment_content_type :image, content_type: ['image/jpeg', 'image/png'],
                                            message: 'file type is not allowed (only jpeg/png images)'
  validates :name,  presence: true, length: { maximum: 255 }
  validates :date,  presence: true, length: { maximum: 255 }
  validates :location,              length: { maximum: 255 }
  validates :description,           length: { maximum: 65535 }
  validates :parameters,            length: { maximum: 65535 }
  validates :references,            length: { maximum: 65535 }
end
