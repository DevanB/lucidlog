require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  setup { @user = User.take }

  test "should redirect to login when not authenticated" do
    get dashboard_path
    assert_redirected_to new_session_path
    assert_nil cookies[:session_id]
  end

  test "should redirect to dashboard when authenticated" do
    sign_in_as(@user)
    get dashboard_path
    assert_response :success
    assert_match @user.email_address, response.body
    assert_equal dashboard_path, path
    assert cookies[:session_id]
  end
end
