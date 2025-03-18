require "application_system_test_case"

class SessionsTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
  end

  test "should log in the user" do
    visit new_session_path
    assert_selector "h1", text: "Log in"

    fill_in "Email address", with: @user.email_address
    fill_in "Password", with: "password"
    click_button "Log in"

    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end

  test "should log out the user" do
    visit new_session_path
    fill_in "Email address", with: @user.email_address
    fill_in "Password", with: "password"
    click_button "Log in"
    click_button "Log Out"
    assert_selector '[data-testid="flash-notice"]', text: "You have been logged out."
    assert_current_path sessions_path
  end
end
