class Proposal < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :reason, length: { maximum: 65535 }
  validates :passions, length: { maximum: 65535 }
  validates :skills, length: { maximum: 65535 }
  validates :work, length: { maximum: 65535 }
  validates :commitment, length: { maximum: 255 }
  validates :estimation, length: { maximum: 255 }
  validates :linkedin, length: { maximum: 255 }
end
