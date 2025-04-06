require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup { @user = User.take }

  test "should get login page" do
    get new_session_path
    assert_response :success
  end

  test "should log in with valid credentials" do
    assert_difference("Session.count") do
      post sessions_path, params: { user: { email_address: @user.email_address, password: "luc1dl0g!" } }
    end
    assert_redirected_to dashboard_path
    assert_equal "Successfully logged in.", flash[:notice]
    assert cookies[:session_id]
  end

  test "should not log in with invalid credentials" do
    assert_no_difference("Session.count") do
      post sessions_path, params: { user: { email_address: @user.email_address, password: "wrong" } }
    end
    assert_redirected_to new_session_path
    assert_nil cookies[:session_id]
  end

  test "should not log in with valid but expired credentials" do
    user = users(:expired)
    assert_no_difference("Session.count") do
      post sessions_path, params: { user: { email_address: user.email_address, password: "luc1dl0g!" } }
    end
    assert_redirected_to new_session_path
    assert_nil cookies[:session_id]
    assert_equal "You need to verify your email address before using LucidLog.", flash[:alert]
  end

  # TODO: seems I can't trick it into working and treating the test like a rate limit
  # test "should enforce rate limit for log in with invalid credentials" do
  #   skip
  #   30.times do
  #     post sessions_path, params: { user: { email_address: @user.email_address, password: "wrong" } }
  #     assert_response :redirect
  #     assert_redirected_to new_session_path
  #     assert_nil cookies[:session_id]
  #   end
  #
  #   post sessions_path, params: { user: { email_address: @user.email_address, password: "wrong" } }
  #   assert_response :too_many_requests
  #   assert_redirected_to new_session_path
  #   assert_equal "Try again later.", flash[:alert]
  #   assert_nil cookies[:session_id]
  # end

  test "should log out" do
    sign_in_as(User.take)

    assert_difference("Session.count", -1) do
      delete delete_session_path
    end
    assert_redirected_to new_session_path
    assert_empty cookies[:session_id]
  end
end
