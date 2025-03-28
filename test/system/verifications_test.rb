require "application_system_test_case"

class VerificationsTest < ApplicationSystemTestCase
  test "can verify email address on new account" do
    skip

    user = users(:unverified)
    visit verification_path(token: user.verification_token)
    assert_selector '[data-testid="flash-notice"]', text: "Your email has been verified"
    # TODO: Verify the user's email_verified_at has been updated
    # Reload the user from the database
    user.reload
    assert_not_nil user.email_verified_at, "User's email_verified_at should be set after verification"
  end

  test "should allow access before verification period ends" do
    skip

    # Create user with a recent verification_sent_at timestamp (within grace period)
    user = users(:unverified)
    user.update(email_verification_sent_at: 1.day.ago)

    # Sign in as the user
    sign_in(user)

    # Visit a protected page
    visit dashboard_path

    # Assert user can access the page (not redirected to verification page)
    assert_current_path dashboard_path
    assert_selector "h1", text: "Dashboard"
  end

  test "should not allow access after verification period ends" do
    skip

    # Create user with an old verification_sent_at timestamp (beyond grace period)
    user = users(:unverified)
    user.update(email_verification_sent_at: 8.days.ago) # Assuming 7-day grace period

    # Sign in as the user
    sign_in(user)

    # Visit a protected page
    visit dashboard_path

    # Assert user is redirected to verification page
    assert_current_path verification_path
    assert_selector "h1", text: "Verify Your Email"
  end

  test "should allow resending of verification email" do
    skip

    # Sign in as an unverified user
    user = users(:unverified)
    sign_in(user)

    # Visit verification page
    visit verification_path

    # Click resend verification button
    assert_difference -> { ActionMailer::Base.deliveries.count } do
      click_on "Resend Verification Email"
    end

    # Assert success message
    assert_selector '[data-testid="flash-notice"]', text: "Verification email sent"

    # Verify email_verification_sent_at is updated
    user.reload
    assert_in_delta Time.current.to_i, user.email_verification_sent_at.to_i, 30
  end

  test "should gracefully handle expired verification tokens" do
    skip

    # Create a user with an expired verification token
    user = users(:unverified)
    # Assuming tokens expire after a certain period
    expired_token = "expired_#{SecureRandom.urlsafe_base64}"
    user.update(verification_token: expired_token, verification_token_sent_at: 30.days.ago)

    # Visit verification path with expired token
    visit verification_path(token: expired_token)

    # Assert proper error message
    assert_selector '[data-testid="flash-alert"]', text: "Verification link has expired"

    # Assert user is directed to request a new verification email
    assert_selector "button", text: "Resend Verification Email"

    # Verify email_verified_at is still nil
    user.reload
    assert_nil user.email_verified_at
  end
end
