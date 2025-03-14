require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get new" do
    get new_user_url
    assert_response :success
  end

  test "should create user" do
    skip "Will implement when adding registration"
    assert_difference("User.count") do
      post users_url, params: { user: { name: "Test User", email_address: "one@example.com", password: "password", password_confirmation: "password" } }
    end

    assert_redirected_to user_url(User.last)
  end
end
