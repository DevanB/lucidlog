require "test_helper"

class PasswordsMailerTest < ActionMailer::TestCase
  test "reset" do
    @user = users(:unverified)
    mail = PasswordsMailer.reset(@user)
    assert_equal "Reset your password", mail.subject
    assert_equal [ @user.email_address ], mail.to
    # TODO: update this email, somewhere
    assert_equal [ "from@example.com" ], mail.from
    assert_includes mail.html_part.body.to_s, "Reset My Password"
  end
end
