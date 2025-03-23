require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get new" do
    get new_user_path
    assert_response :success
  end

  test "should create user" do
    skip
    assert_difference("User.count") do
      post users_path, params: { user: { first_name: "One", last_name: "Name", email_address: "one@example.com", password: "p@ssw0rd!", password_confirmation: "p@ssw0rd!" } }
    end

    assert_redirected_to user_path(User.last)
  end
end
