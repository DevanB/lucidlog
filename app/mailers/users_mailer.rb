class UsersMailer < ApplicationMailer
  def email_verification(user)
    @user = user
    mail to: user.email_address, subject: "Please verify your email address"
  end
end
