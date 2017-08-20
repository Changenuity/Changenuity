class Proposal < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :content, presence: true
end
