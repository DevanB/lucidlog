require "application_system_test_case"

class AppPagesTest < ApplicationSystemTestCase
  test "visiting the dashboard" do
    visit dashboard_url
    assert_selector "h1", text: "Dashboard"
  end
end
