require "test_helper"

class UsersMailerTest < ActionMailer::TestCase
  test "email_verification" do
    @user = users(:unverified)
    mail = UsersMailer.email_verification(@user)
    assert_equal "Please verify your email address", mail.subject
    assert_equal [ @user.email_address ], mail.to
    # TODO: update this email, somewhere
    assert_equal [ "from@example.com" ], mail.from
    assert_includes mail.html_part.body.to_s, "Verify Email Address"
  end
end
