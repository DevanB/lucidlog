class User < ApplicationRecord
  include Verifiable

  has_secure_password
  has_many :sessions, dependent: :destroy

  validates :first_name,
    presence: { message: "First name is required" }
  validates :last_name,
    presence: { message: "Last name is required" }
  validates :email_address,
    presence: { message: "Email address is required" },
    uniqueness: { message: "Email address is not available" },
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Must be a valid email address" }
  validates :password,
    presence: { message: "Password is required" },
    length: { minimum: 8, message: "Password must be at least 8 characters" },
    not_pwned: { threshold: 1, message: "Password has appeared in a data breach and cannot be used for security reasons. Please choose a different password", on_error: :accept }
  validates :password_confirmation,
    presence: { message: "Password confirmation is required" },
    if: -> { password.present? }

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
