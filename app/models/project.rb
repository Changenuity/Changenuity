class Project < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[\w+\-.@]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :name,  presence: true, length: { maximum: 255 }
  validates :date,  presence: true, length: { maximum: 255 }
  validates :location,              length: { maximum: 255 }
  validates :description,           length: { maximum: 65535 }
  validates :parameters,            length: { maximum: 65535 }
  validates :references,            length: { maximum: 65535 }
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  before_save { email.downcase! }
end
