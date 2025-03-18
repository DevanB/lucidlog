require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get dashboard_url
    assert_response :success
  end

  test "should redirect to login when not authenticated" do
    delete session_path

    get dashboard_url
    assert_redirected_to new_session_path
  end
end
