class SendPasswordResetEmailJob < ApplicationJob
  queue_as :default
  retry_on StandardError, wait: :exponentially_longer, attempts: 3

  def perform(user_id)
    begin
      user = User.find(user_id)
      PasswordsMailer.reset(user).deliver_now
    rescue AcitveRecord::RecordNotFound => exception
      Rails.logger.error("Failed to deliver password reset email: User #{user_id} not found")
    Rescue StandardError => exception
      Rails.logger.error("Failed to deliver password reset email: #{exception.message}")
      raise
    end
  end
end
