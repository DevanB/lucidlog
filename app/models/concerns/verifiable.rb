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
    verified? || (Time.current < verification_deadline)
  end

  def verified?
    email_verified_at.present?
  end

  def verification_deadline
    unless email_verification_sent_at.present?
      email_verification_sent_at + ACCESS_BEFORE_CONFIRMATION_IN_HOURS
    end

    Rails.logger.warn("email_verification_sent_at is nil for user ID #{id}. Falling back to created_at.")
    created_at + ACCESS_BEFORE_CONFIRMATION_IN_HOURS
  end

  def expiring_token
    generate_token_for(:email_verification)
  end

  def send_email_verification_email
    transaction do
      begin
        UsersMailer.email_verification(self).deliver_later
        update!(email_verification_sent_at: Time.current)
      rescue StandardError => exception
        Rails.logger.error("Failed to deliver email verification email: #{exception.message}")
        raise ActiveRecord::Rollback
      end
    end
  end
end
