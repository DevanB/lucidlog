require "application_system_test_case"

class SessionsTest < ApplicationSystemTestCase
  setup { @user = users(:unverified) }

  test "should log in the user" do
    visit new_session_path
    assert_selector "h1", text: "Log In"

    fill_in "Email Address", with: @user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"

    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end

  test "should not log in an expired user" do
    user = users(:expired)

    visit new_session_path
    assert_selector "h1", text: "Log In"

    fill_in "Email Address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"

    assert_current_path new_session_path
    assert_selector '[data-testid="flash-alert"]', text: "You need to verify your email address before using LucidLog."
  end

  test "should log out the user" do
    visit new_session_path
    fill_in "Email Address", with: @user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log In"
    click_button "Log Out"
    assert_selector '[data-testid="flash-notice"]', text: "You have been logged out."
    assert_current_path sessions_path
  end
end
