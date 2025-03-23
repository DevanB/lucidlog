require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should redirect to dashboard when authenticated" do
    @user = users(:unverified)
    post sessions_path, params: { user: {  email_address: @user.email_address, password: "p@ssw0rd!" } }

    get dashboard_path
    assert_response :success
    assert_match @user.email_address, response.body
    assert_equal dashboard_path, path
  end

  test "should redirect to login when not authenticated" do
    delete delete_session_path

    get dashboard_path
    assert_redirected_to new_session_path
  end
end
