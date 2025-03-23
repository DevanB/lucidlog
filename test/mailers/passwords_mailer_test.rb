require "test_helper"

class PasswordsMailerTest < ActionMailer::TestCase
  test "reset" do
    @user = users(:unverified)
    mail = PasswordsMailer.reset(@user)
    assert_equal "Reset your password", mail.subject
    assert_equal [ @user.email_address ], mail.to
    assert_equal [ "from@example.com" ], mail.from
  end
end
