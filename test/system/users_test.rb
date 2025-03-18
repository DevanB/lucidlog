require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  test "visit the create an account page" do
    visit users_path
    assert_selector "h1", text: "Create an account"
  end

  test "should create user" do
    skip
  end
end
