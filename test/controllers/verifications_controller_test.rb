require "test_helper"

class VerificationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    skip
    get verifications_path
    assert_response :success
  end

  test "should get create" do
    skip
    get verifications_create_path
    assert_response :success
  end

  test "should get update" do
    skip
    get verification_path
    assert_response :success
  end
end
