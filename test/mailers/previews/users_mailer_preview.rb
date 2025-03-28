# Preview all emails at http://localhost:3000/rails/mailers/users_mailer
class UsersMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/users_mailer/email_verification
  def email_verification_email
    UsersMailer.email_verification(User.take)
  end
end
