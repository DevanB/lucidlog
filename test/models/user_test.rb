require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "First name is present" do
    user = User.new(first_name: "")
    assert_not user.valid?
    assert_includes user.errors[:first_name], "First name is required"
  end

  test "Last name is present" do
    user = User.new(last_name: "")
    assert_not user.valid?
    assert_includes user.errors[:last_name], "Last name is required"
  end

  test "Password is present" do
    user = User.new(password: "")
    assert_not user.valid?
    assert_includes user.errors[:password], "Password is required"
  end

  test "Password_confirmation is present" do
    user = User.new(password: "valid_password!", password_confirmation: "")
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "Password confirmation is required"
  end

  test "Password confirmation must match password" do
    user = User.new(password: "no", password_confirmation: "match")
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "Password confirmation must match Password"
  end

  test "Password is not pwned" do
    user = User.new(password: "weak")
    assert_not user.valid?
    assert_includes user.errors[:password], "Password has appeared in a data breach and cannot be used for security reasons. Please choose a different password"
  end

  test "Password is at least eight characters" do
    user = User.new(password: "short")
    assert_not user.valid?
    assert_includes user.errors[:password], "Password must be at least 8 characters"
  end

  test "Downcases and strips email_address" do
    user = User.new(email_address: "DOWNCASED@EXAMPLE.COM")
    assert_equal("downcased@example.com", user.email_address)
  end
end
