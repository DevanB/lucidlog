require "application_system_test_case"

class PasswordsTest < ApplicationSystemTestCase
  include ActionMailer::TestHelper
  include ActiveJob::TestHelper

  setup do
    @user = User.take
    ActionMailer::Base.deliveries.clear
  end

  test "unauthenticated user should reset their password" do
    visit passwords_path
    assert_selector "h1", text: "Forgot Password"

    fill_in "Email Address", with: @user.email_address
    perform_enqueued_jobs do
      click_button "Email Password Reset Link"
    end
    assert_selector '[data-testid="flash-notice"]', text: "Password reset instructions sent (if user with that email address exists)."
    assert_current_path new_session_path

    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1

    token = email.text_part.body.to_s.match(/reset-password\/([^\n\r]+)/)[1]

    visit edit_password_path(token)
    assert_selector "h1", text: "Reset Password"

    fill_in "Password", with: "an0th3rPa$$w0rd"
    fill_in "Confirm Password", with: "an0th3rPa$$w0rd"
    click_button "Reset Password"

    assert_current_path new_session_path
    assert_selector '[data-testid="flash-notice"]', text: "Password has been reset."
  end

  test "authenticated user should reset their password" do
    # Log In
    visit new_session_path
    assert_selector "h1", text: "Log In"

    fill_in "Email Address", with: @user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"

    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path

    # Follow password reset flow
    visit passwords_path
    assert_selector "h1", text: "Forgot Password"

    fill_in "Email Address", with: @user.email_address
    perform_enqueued_jobs do
      click_button "Email Password Reset Link"
    end
    assert_selector '[data-testid="flash-notice"]', text: "Password reset instructions sent (if user with that email address exists)."
    assert_current_path new_session_path

    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1

    token = email.text_part.body.to_s.match(/reset-password\/([^\n\r]+)/)[1]

    visit edit_password_path(token)
    assert_selector "h1", text: "Reset Password"

    fill_in "Password", with: "an0th3rPa$$w0rd"
    fill_in "Confirm Password", with: "an0th3rPa$$w0rd"
    click_button "Reset Password"

    assert_current_path new_session_path
    assert_selector '[data-testid="flash-notice"]', text: "Password has been reset."
  end

  test "unauthenticated and expired user should reset their password and confirm their email" do
    user = users(:expired)

    # Shouldn't be able to log in
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_current_path new_session_path
    assert_selector '[data-testid="flash-alert"]', text: "You need to verify your email address before using LucidLog."

    # Forgot Password flow
    visit passwords_path
    assert_selector "h1", text: "Forgot Password"
    fill_in "Email Address", with: user.email_address
    perform_enqueued_jobs do
      click_button "Email Password Reset Link"
    end
    assert_selector '[data-testid="flash-notice"]', text: "Password reset instructions sent (if user with that email address exists)."
    assert_current_path new_session_path
    email = ActionMailer::Base.deliveries.last
    assert_not_nil email, "No email was sent"
    assert_emails 1
    token = email.text_part.body.to_s.match(/reset-password\/([^\n\r]+)/)[1]

    # Reset Password flow
    visit edit_password_path(token)
    assert_selector "h1", text: "Reset Password"
    fill_in "Password", with: "an0th3rPa$$w0rd"
    fill_in "Confirm Password", with: "an0th3rPa$$w0rd"
    click_button "Reset Password"
    assert_current_path new_session_path
    assert_selector '[data-testid="flash-notice"]', text: "Password has been reset."

    # Should be able to log in with new password and verified email
    visit new_session_path
    assert_selector "h1", text: "Log In"
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "an0th3rPa$$w0rd"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end
end
