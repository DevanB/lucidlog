require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get login page" do
    get new_session_path
    assert_response :success
  end

  test "should log in with valid credentials" do
    assert_difference("Session.count") do
      post sessions_path, params: { email_address: @user.email_address, password: "password" }
    end

    assert_redirected_to dashboard_path
    assert_match @user.email_address, response.body
  end

  test "should not log in with invalid credentials" do
    assert_no_difference("Session.count") do
      post sessions_path, params: { email_address: @user.email_address, password: "wrong_password" }
    end
  end

  test "should log out" do
    post sessions_path, params: { email_address: @user.email_address, password: "password" }

    assert_difference("Session.count", -1) do
      delete delete_session_path
    end

    assert_redirected_to new_session_path
  end
end
