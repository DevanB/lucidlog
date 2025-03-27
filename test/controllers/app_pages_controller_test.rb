require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should redirect to dashboard when authenticated" do
    @user = users(:unverified)
    post sessions_path, params: { user: {  email_address: @user.email_address, password: "luc1dl0g!" } }

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

  test "should redirect unverified users to verification page" do
    skip

    # First verify the user is actually unverified
    @user = users(:unverified)
    assert_nil @user.email_verified_at

    # Log in as the unverified user
    post sessions_path, params: { user: { email_address: @user.email_address, password: "luc1dl0g!" } }

    # Attempt to access the dashboard
    get dashboard_path

    # Assert redirection to verification page if that's the expected behavior
    assert_redirected_to verification_path
  end
end
