require "test_helper"

class AppPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get dashboard_url
    assert_response :success
  end
end
