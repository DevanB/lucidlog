require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "unverified user redirects to login when not authenticated" do
    visit dashboard_path
    assert_selector '[data-testid="flash-alert"]', text: "You must be logged in to access that page."
    assert_current_path new_session_path
  end

  test "unverified user redirects to dashboard after authenticating" do
    user = users(:unverified)

    visit new_session_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "luc1dl0g!"
    click_button "Log in"
    assert_selector '[data-testid="flash-notice"]', text: "Successfully logged in."
    assert_current_path dashboard_path
  end

  test "verified user redirects to login when not authenticated" do
    skip
  end

  test "verified user redirects to dashboard after authenticating" do
    skip
  end
end
