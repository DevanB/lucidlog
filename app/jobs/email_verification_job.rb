class EmailVerificationJob < ApplicationJob
  queue_as :default

  def perform(user)
    user.send_email_verification_email
  end
end
