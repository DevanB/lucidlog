require "application_system_test_case"

class PasswordsTest < ApplicationSystemTestCase
  test "visit the forgot password page" do
    visit passwords_path
    assert_selector "h1", text: "Forgot password"
  end

  test "should reset password" do
    skip
  end
end
