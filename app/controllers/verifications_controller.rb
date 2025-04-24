class VerificationsController < ApplicationController
  allow_unauthenticated_access only: %i[show]
  inertia_share flash: -> { flash.to_hash }

  def index
    render inertia: "Authentication/VerifyEmail"
  end

  def create
    begin
      UsersMailer.email_verification(Current.user).deliver_later
    rescue StandardError => exception
      Rails.logger.error("Failed to deliver email verification email: #{exception.message}")
    end
    redirect_to verifications_path, notice: "A new verification link has been sent to the email address you provided during registration."
  end

  def show
    @user = User.find_by_token_for(:email_verification, params[:token])
    if @user.nil?
      redirect_to new_session_path, alert: "Invalid or expired verification link."
    elsif @user.email_verified_at?
      redirect_to dashboard_path, notice: "Email address verified successfully."
    elsif @user.verify!
      redirect_to dashboard_path, notice: "Email address verified successfully."
    else
      redirect_to new_session_path, alert: "Invalid or expired verification link."
    end
  end
end
