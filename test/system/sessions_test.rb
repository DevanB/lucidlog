require "application_system_test_case"

class SessionsTest < ApplicationSystemTestCase
  test "visit the login page" do
    visit sessions_path
    assert_selector "h1", text: "Log in"
  end

  test "should log in" do
    skip
  end
end
