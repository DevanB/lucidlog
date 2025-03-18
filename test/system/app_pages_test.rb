require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "redirects to login when not authenticated" do
    visit dashboard_url
    assert_current_path new_session_path
  end

  test "navigates to dashboard after authenticating" do
    user = users(:one)

    visit new_session_path
    fill_in "Email address", with: user.email_address
    fill_in "Password", with: "password"
    click_button "Log in"
    assert_selector "h1", text: "Dashboard"
  end
end
