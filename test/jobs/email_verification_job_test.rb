require "test_helper"

class EmailVerificationJobTest < ActiveJob::TestCase
  setup do
    @user = users(:unverified)
  end

  test "job is enqueued" do
    assert_enqueued_with(job: EmailVerificationJob, args: [ @user ]) do
      EmailVerificationJob.perform_later(@user)
    end
  end

  test "job is performed" do
    perform_enqueued_jobs do
      EmailVerificationJob.perform_later(@user)
    end
    assert_performed_jobs 1
  end
end
