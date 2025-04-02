require "test_helper"

# TODO: add tests for other methods on concern
class VerifiableTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  setup do
    unverified_user = users(:unverified)
    @user = User.new(
      first_name: unverified_user.first_name,
      last_name: unverified_user.last_name,
      email_address: "test_user_#{SecureRandom.hex(4)}@example.com",
      password: "luc1dl0g!",
      password_confirmation: "luc1dl0g!",
    )
  end

  test "send_email_verification_email sends email" do
    perform_enqueued_jobs do
      @user.save!
    end
    assert_not ActionMailer::Base.deliveries.empty?
    email = ActionMailer::Base.deliveries.last
    assert_equal [ @user.email_address ], email.to
    assert_equal "Please verify your email address", email.subject
    assert_nil @user.email_verified_at, "email_verified_at should be nil after creation"
    # TODO: need to add asserts for correct values,
    # specifically email_verified_at
  end
end
