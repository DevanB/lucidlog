module Verifiable
  extend ActiveSupport::Concern

  # 168 hours = 1 week
  ACCESS_BEFORE_CONFIRMATION_IN_HOURS = 168.hours

  included do
    after_commit :send_email_verification_email, on: :create
    generates_token_for :email_verification, expires_in: ACCESS_BEFORE_CONFIRMATION_IN_HOURS
  end

  def verify!
    return true if verified?
    update_columns(email_verified_at: Time.current)
  end

  def can_access_app?
    return true if verified? || Time.current < verification_deadline

    send_email_verification_email
    false
  end

  def verified?
    email_verified_at.present?
  end

  def verification_deadline
    created_at + ACCESS_BEFORE_CONFIRMATION_IN_HOURS
  end

  def expiring_token
    generate_token_for(:email_verification)
  end

  def send_email_verification_email
    begin
      UsersMailer.email_verification(self).deliver_later
    rescue StandardError => exception
      Rails.logger.error("Failed to deliver email verification email: #{exception.message}")
      raise ActiveRecord::Rollback
    end
  end
end
