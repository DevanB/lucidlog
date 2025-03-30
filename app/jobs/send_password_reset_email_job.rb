class SendPasswordResetEmailJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)
    PasswordsMailer.reset(user).deliver_now
  end
end
