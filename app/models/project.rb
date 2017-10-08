class Project < ApplicationRecord
  has_many :proposals
  belongs_to :user
  
  acts_as_taggable_on :tags
  has_attached_file :image, styles: { large: '1000x1000>', medium: '300x300>', thumb: '100x100>' },
                            s3_protocol: :https
  validates_attachment_content_type :image,
    content_type: ['image/jpeg', 'image/png'],
    message: 'file type is not allowed (only jpeg/png images)'
  validates :name,  presence: true, length: { maximum: 255 }
  validates :date,  presence: true, length: { maximum: 255 }
  validates :location,              length: { maximum: 255 }
  validates :description,           length: { maximum: 65535 }
  validates :parameters,            length: { maximum: 65535 }
  validates :references,            length: { maximum: 65535 }
  validates :user_id, presence: true

  # store :form_fields, coder: JSON, accessors: [:reason, :passions, :skills, :work, :commitment, :estimation, :website, :linkedin, :github]
  serialize :form_fields, Array

  def self.search(term)
    if term
      where('lower(name) LIKE lower(?)', "%#{term}%").order('id DESC')
    else
      order('id DESC')
    end
  end
end
