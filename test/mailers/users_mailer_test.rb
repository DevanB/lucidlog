require "test_helper"

class UsersMailerTest < ActionMailer::TestCase
  test "email_verification" do
    @user = users(:unverified)
    mail = UsersMailer.email_verification(@user)
    assert_equal "Please verify your email address", mail.subject
    assert_equal [ @user.email_address ], mail.to
    assert_equal [ "from@example.com" ], mail.from
  end
end
