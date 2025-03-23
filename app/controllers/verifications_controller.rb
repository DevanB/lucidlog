class VerificationsController < ApplicationController
  inertia_share flash: -> { flash.to_hash }

  def index
    render inertia: "Authentication/VerifyEmail"
  end

  def create
    Current.user.send_email_verification_email
    redirect_to dashboard_path, notice: "Please check your email to continue verifying"
  end

  def show
    @user = User.find_by_token_for(:email_verification, params[:token])
    if @user.present? && @user.verify!
      redirect_to dashboard_path, notice: "Your email has been verified"
    else
      redirect_to root_path, alert: "Invalid or expired verification link"
    end
  end
end
