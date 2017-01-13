class Project < ApplicationRecord

  validates :name,  presence: true, length: { maximum: 255 }
  validates :date,  presence: true, length: { maximum: 255 }
  validates :location,              length: { maximum: 255 }
  validates :description,           length: { maximum: 65535 }
  validates :parameters,            length: { maximum: 65535 }
  validates :references,            length: { maximum: 65535 }
end
