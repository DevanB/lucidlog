require "test_helper"

class VerificationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    skip

    sign_in(users(:one))
    get verifications_path
    assert_response :success
    assert_select "h1", "Email Verification"
  end

  test "should get/post create" do
    skip

    sign_in(users(:unverified))
    assert_difference -> { ActionMailer::Base.deliveries.count } do
      post verifications_path
    end
    assert_redirected_to root_path
    assert_equal "Verification email sent.", flash[:notice]
  end

  test "should get show" do
    skip

    user = users(:unverified)
    token = "valid-token"
    # Assume a helper method or directly set a token for testing
    get verification_path(token)
    assert_response :success
    # Additional assertions based on your implementation
  end

  test "should handle invalid verification token" do
    skip

    patch verification_path(id: "invalid-token")
    assert_response :unprocessable_entity
    # or whatever response code your application uses for invalid tokens
    assert_not_nil flash[:alert]
  end

  test "expired verification token" do
    skip
  end

  # TODO: what do already verified accounts that are reverifying do?
  test "already verified accounts do X" do
    skip

    user = users(:verified)
    # Assuming you have a method to generate tokens
    token = user.generate_verification_token
    patch verification_path(id: token)
    assert_response :redirect
    assert_redirected_to root_path
    assert_not_nil flash[:notice]
  end

  # TODO: do we need to rate limit verification requests?
  test "rate limiting" do
    skip
  end
end
