class Identity < ApplicationRecord
  belongs_to :user
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, scope: :provider

  def Identity.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |identity|
      identity.provider = auth.provider
      identity.uid = auth.uid
    end
  end
end
