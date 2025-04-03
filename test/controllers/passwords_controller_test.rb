require "test_helper"

class PasswordsControllerTest < ActionDispatch::IntegrationTest
  setup { @user = User.take }

  test "should get new" do
    get new_password_path
    assert_response :success
  end

  test "should create password reset" do
    post passwords_path, params: { user: { email_address: @user.email_address } }
    assert_enqueued_email_with PasswordsMailer, :reset, args: [ @user ]
    assert_redirected_to new_session_path
    follow_redirect!
    assert_equal "Password reset instructions sent (if user with that email address exists).", flash[:notice]
  end

  test "create for an email that doesn't have an account redirects but sends no mail" do
    post passwords_path, params: { user: { email_address: "missing-user@example.com" } }
    assert_enqueued_emails 0
    assert_redirected_to new_session_path
    follow_redirect!
    assert_equal "Password reset instructions sent (if user with that email address exists).", flash[:notice]
  end

  test "edit" do
    get edit_password_path(@user.password_reset_token)
    assert_response :success
  end

  test "edit with invalid password reset token" do
    get edit_password_path("invalid token")
    assert_redirected_to new_password_path
    follow_redirect!
    assert_equal "Password reset link is invalid or has expired.", flash[:alert]
  end

  test "update" do
    assert_changes -> { @user.reload.password_digest } do
      put password_path(@user.password_reset_token), params: { user: { password: "luc1dl0g!", password_confirmation: "luc1dl0g!" } }
      assert_redirected_to new_session_path
    end
    follow_redirect!
    assert_equal "Password has been reset.", flash[:notice]
  end

  test "update unverified account's password successfully verifies the email address" do
    user = users(:unverified)
    assert_nil user.email_verified_at
    assert_changes -> { user.reload.slice(:password_digest, :email_verified_at) } do
      put password_path(user.password_reset_token), params: { user: { password: "luc1dl0g!", password_confirmation: "luc1dl0g!" } }
      assert_redirected_to new_session_path
    end
    follow_redirect!
    assert_equal "Password has been reset.", flash[:notice]
  end

  test "update with non-matching passwords fails" do
    token = @user.password_reset_token
    assert_no_changes -> { @user.reload.password_digest } do
      put password_path(token), params: { user: { password: "no", password_confirmation: "match" } }
      assert_redirected_to edit_password_path(token)
    end
    follow_redirect!
    assert_match "Password confirmation must match Password", response.body
  end

  test "update with pwned password fails" do
    token = @user.password_reset_token
    assert_no_changes -> { @user.reload.password_digest } do
      put password_path(token), params: { user: { password: "weak", password_confirmation: "weak" } }
      assert_redirected_to edit_password_path(token)
    end
    follow_redirect!
    assert_match "Password has appeared in a data breach and cannot be used for security reasons. Please choose a different password", response.body
  end

  test "update with password with less than seven characters fails" do
    token = @user.password_reset_token
    assert_no_changes -> { @user.reload.password_digest } do
      put password_path(token), params: { user: { password: "short", password_confirmation: "short" } }
      assert_redirected_to edit_password_path(token)
    end
    follow_redirect!
    assert_match "Password must be at least 8 characters", response.body
  end

  test "update with no password fails" do
    token = @user.password_reset_token
    assert_no_changes -> { @user.reload.password_digest } do
      put password_path(token), params: { user: { password: "", password_confirmation: "" } }
      assert_redirected_to edit_password_path(token)
    end
    follow_redirect!
    assert_match "Password is required", response.body
  end
end
