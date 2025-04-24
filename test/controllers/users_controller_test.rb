require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_user_path
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_path, params: { user: { first_name: "User", last_name: "Name", email_address: "any@one.com", password: "luc1dl0g!", password_confirmation: "luc1dl0g!" } }
    end
    assert_redirected_to dashboard_path
    user = User.order(:created_at).last
    assert_equal "User", user.first_name
    assert_equal "Name", user.last_name
    assert_equal "any@one.com", user.email_address
  end

  test "should not create user with invalid email" do
    assert_no_difference("User.count") do
      post users_path, params: { user: { first_name: "User", last_name: "Name", email_address: "invalid_email", password: "luc1dl0g!", password_confirmation: "luc1dl0g!" } }
    end

    assert_redirected_to new_user_path
    follow_redirect!
    assert_match "Must be a valid email address", response.body
  end

  # TODO: implement test "should not create user with existing email"

  test "should not create user with mismatched passwords" do
    assert_no_difference("User.count") do
      post users_path, params: { user: { first_name: "User", last_name: "Name", email_address: "any@one.com", password: "password1", password_confirmation: "password2" } }
    end

    assert_redirected_to new_user_path
    follow_redirect!
    assert_match "Password confirmation must match Password", response.body
  end
end
