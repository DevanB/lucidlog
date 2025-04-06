require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  test "should create an account" do
    visit users_path
    assert_selector "h1", text: "Create Account"
    fill_in "First Name", with: "John"
    fill_in "Last Name", with: "Doe"
    fill_in "Email Address", with: "john.doe@gmail.com"
    fill_in "Password", with: "luc1dl0g!"
    fill_in "Confirm Password", with: "luc1dl0g!"
    click_button "Create Account"
    assert_current_path dashboard_path
    assert_selector '[data-testid="flash-notice"]', text: "You've successfully created an account. Welcome!"
  end
end
