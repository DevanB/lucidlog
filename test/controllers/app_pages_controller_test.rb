require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should redirect to login when not authenticated" do
    delete session_path

    get dashboard_url
    assert_redirected_to new_session_path
  end

  test "should get dashboard when authenticated" do
    user = users(:one)
    post session_path, params: { email_address: user.email_address, password: "password" }

    get dashboard_url
    assert_response :success
  end
end
