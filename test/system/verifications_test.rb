require "application_system_test_case"

class VerificationsTest < ApplicationSystemTestCase
  include ActionMailer::TestHelper
  include ActiveJob::TestHelper

  setup do
    @user = User.take
    ActionMailer::Base.deliveries.clear
  end

  test "can verify email address on new account" do
    visit users_path
    assert_selector "h1", text: "Create Account"
    fill_in "First Name", with: "John"
    fill_in "Last Name", with: "Doe"
    fill_in "Email Address", with: "john.doe@gmail.com"
    fill_in "Password", with: "luc1dl0g!"
    fill_in "Confirm Password", with: "luc1dl0g!"
    click_button "Create Account"
    assert_current_path dashboard_path
    assert_selector '[data-testid="flash-notice"]', text: "You've successfully created an account. Welcome!"
    assert_selector '[data-testid="email-verification-banner"]', text: "Please verify your email address."
    user = User.find_by(email_address: "john.doe@gmail.com")
    user.reload
    assert_nil user.email_verified_at, "User's email_verified_at should still be nil after resending verification"

    perform_enqueued_jobs
    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1
    assert_equal "Please verify your email address", email.subject

    token = email.text_part.body.to_s.match(/verify-email\/([^\n\r]+)/)[1]

    visit verification_path(token)
    assert_current_path dashboard_path
    assert_selector '[data-testid="flash-notice"]', text: "Email address verified successfully."
    user.reload
    assert_not_nil user.email_verified_at, "User's email_verified_at should be set after verification"
  end

  test "can verify email address on unverified account" do
    user = users(:verified)
    assert_not_nil user.email_verified_at, "User's email_verified_at should still be nil after resending verification"
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path

    visit verifications_path
    click_button "Resend Verification Email"
    assert_selector '[data-testid="flash-notice"]', text: "A new verification link has been sent to the email address you provided during registration."
    user.reload

    perform_enqueued_jobs
    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1
    assert_equal "Please verify your email address", email.subject

    token = email.text_part.body.to_s.match(/verify-email\/([^\n\r]+)/)[1]

    visit verification_path(token)
    assert_current_path dashboard_path
    assert_selector '[data-testid="flash-notice"]', text: "Email address verified successfully."
    user.reload
    assert_not_nil user.email_verified_at, "User's email_verified_at should be set after verification"
  end

  test "can verify email address on already verified account" do
    user = users(:verified)
    assert_not_nil user.email_verified_at, "User's email_verified_at should still be nil after resending verification"
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path

    visit verifications_path
    click_button "Resend Verification Email"
    assert_selector '[data-testid="flash-notice"]', text: "A new verification link has been sent to the email address you provided during registration."
    user.reload

    perform_enqueued_jobs
    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1
    assert_equal "Please verify your email address", email.subject

    token = email.text_part.body.to_s.match(/verify-email\/([^\n\r]+)/)[1]

    visit verification_path(token)
    assert_current_path dashboard_path
    assert_selector '[data-testid="flash-notice"]', text: "Email address verified successfully."
    user.reload
    assert_not_nil user.email_verified_at, "User's email_verified_at should be set after verification"
  end

  test "should allow access before verification period ends" do
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: @user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end

  test "should not allow access after verification period ends" do
    user = users(:expired)
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-alert"]', text: "You need to verify your email address before using LucidLog."
    assert_current_path new_session_path
  end

  test "should allow resending of verification email" do
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: @user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path

    visit verifications_path
    click_button "Resend Verification Email"
    assert_selector '[data-testid="flash-notice"]', text: "A new verification link has been sent to the email address you provided during registration."
    @user.reload
    assert_nil @user.email_verified_at, "User's email_verified_at should still be nil after resending verification"

    perform_enqueued_jobs
    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1
    assert_equal "Please verify your email address", email.subject
  end

  test "should gracefully handle expired verification tokens" do
    user = users(:unverified)
    token = user.generate_token_for(:email_verification)

    travel_to 8.days.from_now do
      visit verification_path(token)
      assert_current_path new_session_path
      assert_selector '[data-testid="flash-alert"]', text: "Invalid or expired verification link."
    end

    # TODO: If someone uses an invalid token, should we automatically send another email?
    # assert_nil user.email_verified_at
    # perform_enqueued_jobs
    # email = ActionMailer::Base.deliveries.last
    # assert_not_nil email, "No email was sent"
    # assert_emails 1
    # assert_equal "Please verify your email address", email.subject
  end
end
