class PasswordsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_token, only: %i[ edit update ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_password_path, alert: "Try agan later." }

  inertia_share flash: -> { flash.to_hash }

  def new
    render inertia: "Authentication/ForgotPassword"
  end

  def create
    if user = User.find_by(create_params)
      begin
        PasswordsMailer.reset(user).deliver_later
      rescue StandardError => exception
        Rails.logger.error("Failed to deliver email verification email: #{exception.message}")
      end
    end

    redirect_to new_session_path, notice: "Password reset instructions sent (if user with that email address exists)."
  end

  def edit
    render inertia: "Authentication/ResetPassword", props: { token: params[:token] }
  end

  def update
    if @user.update(update_params)
      @user.sessions.destroy_all
      @user.update_columns(email_verified_at: Time.now) if @user.email_verified_at.nil?
      redirect_to new_session_path, notice: "Password has been reset."
    else
      redirect_to edit_password_path(params[:token]), inertia: { errors: @user.errors }
    end
  end

  private
    def set_user_by_token
      @user = User.find_by_password_reset_token!(params[:token])
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      redirect_to new_password_path, alert: "Password reset link is invalid or has expired."
    end

    def create_params
      params.require(:user).permit(:email_address)
    end

    def update_params
      params.require(:user).permit(:password, :password_confirmation)
    end
end
