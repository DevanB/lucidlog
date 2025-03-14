require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  setup do
    @user = users(:one)
  end

  test "visiting the index" do
    visit users_url
    assert_selector "h1", text: "Create an account"
  end

  test "should create user" do
    skip "Skipping until able to implement tests with Inertia"
    visit users_url
    fill_in "Name", with: @user.name
    fill_in "Email", with: @user.email_address
    fill_in "Password", with: @user.password
    fill_in "Confirm password", with: @user.password_confirmation
    click_on "Create account"

    assert_text "User was successfully created"
    click_on "Back"
  end
end
