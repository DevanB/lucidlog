require "test_helper"

class SendPasswordResetEmailJobTest < ActiveJob::TestCase
  setup do
    @user = users(:unverified)
  end

  test "job is enqueued" do
    assert_enqueued_with(job: SendPasswordResetEmailJob, args: [ @user.id ]) do
      SendPasswordResetEmailJob.perform_later(@user.id)
    end
  end

  test "job is performed" do
    perform_enqueued_jobs do
      SendPasswordResetEmailJob.perform_later(@user.id)
    end
    assert_performed_jobs 1
  end
end
