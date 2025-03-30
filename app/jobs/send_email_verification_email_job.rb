class SendEmailVerificationEmailJob < ApplicationJob
  queue_as :default
  retry_on StandardError, wait: :exponentially_longer, attempts: 3

  def perform(user)
    user.send_email_verification_email
  end
end
