class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :dreams, dependent: :destroy
  validates :password, not_pwned: { threshold: 1, message: "has appeared in a data breach and cannot be used for security reasons. Please choose a different password.", on_error: :accept }

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
