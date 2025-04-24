require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "unauthenticated user redirects to login when accessing dashboard" do
    visit dashboard_path
    assert_selector '[data-testid="flash-alert"]', text: "You must be logged in to access that page."
    assert_current_path new_session_path
  end

  test "unverified user redirects to dashboard after authenticating" do
    user = users(:unverified)

    visit new_session_path
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_selector '[data-testid="email-verification-banner"]', text: "Please verify your email address."
    assert_current_path dashboard_path
  end

  test "verified user redirects to dashboard after authenticating" do
    user = users(:verified)

    visit new_session_path
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_no_selector '[data-testid="email-verification-baner"]', text: "Please verify your email address."
    assert_current_path dashboard_path
  end

  test "expired unverified user cannot authenticate" do
    user = users(:expired)

    visit new_session_path
    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    assert_selector '[data-testid="flash-alert"]', text: "You need to verify your email address before using LucidLog."
    assert_current_path new_session_path
  end
end
