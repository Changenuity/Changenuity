class User < ApplicationRecord
  # Temporarily override default Devise confirmation mailer
  def send_on_create_confirmation_instructions
  end

  has_many :authentications

  TEMP_EMAIL_PREFIX = 'changeme@changenuity'
  TEMP_EMAIL_REGEX = /\Achangeme@changenuity/

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  validates_format_of :email, without: TEMP_EMAIL_REGEX, on: :update

  def User.find_for_omniauth(auth, signed_in_resource = nil)
    # Get the authentication and user if they exist
    authentication = Authentication.from_omniauth(auth)

    # If a signed_in_resource is provided it always overrides the existing user
    # to prevent the authentication being locked with accidentally created accounts.
    # Note that this may leave zombie accounts (with no associated authentication) which
    # can be cleaned up at a later date.
    user = signed_in_resource ? signed_in_resource : authentication.user

    # Create the user if needed
    if user.blank?

      # Get the existing user by email if the provider gives us a verified email.
      # If no verified email was provided we assign a temporary email and ask the
      # user to verify it on the next step via UsersController.finish_signup
      email_is_verified = auth.info.email && (auth.info.verified || auth.info.verified_email)
      email = auth.info.email if email_is_verified
      user = User.where(email: email).first if email

      # Create the user if it's a new registration
      if user.blank?
        user = User.new(
          name: auth.extra.raw_info.name || auth.info.nickname || auth.uid,
          email: email ? email : "#{TEMP_EMAIL_PREFIX}-#{auth.uid}-#{auth.provider}.com",
          password: Devise.friendly_token[0,20]
        )
        user.skip_confirmation!
        user.save!
      end
    end

    # Associate the authentication with the user if needed
    if authentication.user != user
      authentication.user = user
      authentication.save!
    end
    user
  end

  def email_verified?
    self.email && self.email !~ TEMP_EMAIL_REGEX
  end

  protected # FIXME: bypass email confirmation
  def confirmation_required?
   false
  end

end
