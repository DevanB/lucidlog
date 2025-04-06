class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]
  rate_limit to: 10, within: 3.minutes, only: :create, by: -> { request.domain }, with: -> { redirect_to new_session_path, alert: "Try again later." }

  inertia_share flash: -> { flash.to_hash }

  def new
    return redirect_to after_authentication_url, notice: "Successfully logged in." if Current.user.present?
    render inertia: "Authentication/Login"
  end

  def create
    user = User.authenticate_by(user_params)
    return redirect_to new_session_path, alert: "Invalid email address or password. Please try again." unless user

    unless user.can_access_app?
      return redirect_to new_session_path, alert: "You need to verify your email address before using LucidLog."
    end

    start_new_session_for user
    redirect_to after_authentication_url, notice: "Successfully logged in."
  end

  def destroy
    terminate_session
    redirect_to new_session_path, notice: "You have been logged out."
  end

  private

  def user_params
    params.require(:user).permit(:email_address, :password)
  end
end
