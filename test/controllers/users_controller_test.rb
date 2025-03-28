require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:unverified)
  end

  test "should get new" do
    get new_user_path
    assert_response :success
  end

  test "should create user" do
    skip
    assert_difference("User.count") do
      post users_path, params: { user: { first_name: @user.first_name, last_name: @user.last_name, email_address: @user.email_address, password: "luc1dl0g!", password_confirmation: "luc1dl0g" } }
    end

    assert_redirected_to user_path(User.last)
  end
end
