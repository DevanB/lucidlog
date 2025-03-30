require "test_helper"

class SendEmailVerificationEmailJobTest < ActiveJob::TestCase
  setup do
    @user = users(:unverified)
  end

  test "job is enqueued" do
    assert_enqueued_with(job: SendEmailVerificationEmailJob, args: [ @user ]) do
      SendEmailVerificationEmailJob.perform_later(@user)
    end
  end

  test "job is performed" do
    perform_enqueued_jobs do
      SendEmailVerificationEmailJob.perform_later(@user)
    end
    assert_performed_jobs 1
  end
end
