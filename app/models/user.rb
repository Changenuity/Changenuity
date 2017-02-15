class User < ApplicationRecord
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

	before_save {email.downcase!}

	validates :name, presence: true, length: {maximum: 50}
	validates :email, presence: true, 
										length: {maximum: 255}, 
										format: {with: VALID_EMAIL_REGEX},
										uniqueness: { case_sensitive: false }

	has_secure_password
	# gives ability to save a securely hashed password_digest attribute to the database
	# A pair of virtual attributes (password, password_confirmation),
	# including presence validations upon object creation and a validation requiring that they match
	# An authenticate method that returns the user when the password is correct (and false otherwise)
	validates :password, presence: true, length: { minimum: 6 }

end