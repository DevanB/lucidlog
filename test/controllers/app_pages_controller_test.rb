require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should redirect to login when not authenticated" do
    delete delete_session_path

    get dashboard_path
    assert_redirected_to new_session_path
  end

  test "should redirect to dashboard when authenticated" do
    user = users(:one)
    post sessions_path, params: { email_address: user.email_address, password: "password" }

    get dashboard_path
    assert_response :success
    assert_equal dashboard_path, path
  end
end
