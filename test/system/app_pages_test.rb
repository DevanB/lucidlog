require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "redirects to login when not authenticated" do
    visit dashboard_path
    assert_selector '[data-testid="flash-alert"]', text: "You must be logged in to access that page."
    assert_current_path new_session_path
  end

  test "redirects to dashboard after authenticating" do
    user = users(:one)

    visit new_session_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    click_button "Log in"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end
end
