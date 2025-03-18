require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "redirects to login when not authenticated" do
    visit dashboard_url
    assert_current_path new_user_session_path
  end

  test "visiting the dashboard" do
    sign_in users(:one)
    visit dashboard_url
    assert_selector "h1", text: "Dashboard"
  end
end
