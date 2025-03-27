require "application_system_test_case"

class VerificationsTest < ApplicationSystemTestCase
  test "can verify email address on new account" do
    skip

    user = users(:unverified)
    visit verification_path(token: user.verification_token)
    assert_selector '[data-testid="flash-notice"]', text: "Your email has been verified"
    # Verify the user's email_verified_at has been updated
  end

  test "should allow access before verification period ends" do
    skip
  end

  test "should not allow access after verification period ends" do
    skip
  end

  test "should allow resending of verification email" do
    skip
  end

  test "should gracefully handle expired verification tokens" do
    skip
  end
end
