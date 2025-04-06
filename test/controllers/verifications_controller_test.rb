require "test_helper"

class VerificationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    sign_in_as(users(:unverified))
    get verifications_path
    assert_response :success
  end

  test "should get/post create" do
    user = users(:unverified)
    sign_in_as(user)
    post verifications_create_path
    assert_enqueued_email_with UsersMailer, :email_verification, args: [ user ]
    assert_equal verifications_create_path, path
    assert_equal "A new verification link has been sent to the email address you provided during registration.", flash[:notice]
  end

  test "should handle valid verification token" do
    user = users(:unverified)
    token = user.generate_token_for(:email_verification)
    get verification_path(token)
    assert_redirected_to dashboard_path
    assert_equal "Email address verified successfully.", flash[:notice]
  end

  test "should handle already verified email addresses with valid token" do
    user = users(:verified)
    token = user.generate_token_for(:email_verification)
    get verification_path(token)
    assert_redirected_to dashboard_path
    assert_equal "Email address verified successfully.", flash[:notice]
  end

  test "should handle invalid verification token" do
    token = "invalid-token"
    get verification_path(token)
    assert_redirected_to new_session_path
    assert_equal "Invalid or expired verification link.", flash[:alert]
  end

  test "should handle expired verification token" do
    user = users(:unverified)
    token = user.generate_token_for(:email_verification)
    travel_to 8.days.from_now do
      get verification_path(token)
    end
    assert_redirected_to new_session_path
    assert_equal "Invalid or expired verification link.", flash[:alert]
  end
end
