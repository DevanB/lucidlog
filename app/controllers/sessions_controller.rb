class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]
  before_action :resume_session, only: %i[new]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  inertia_share flash: -> { flash.to_hash }

  def new
    return redirect_to after_authentication_url, notice: "Successfully logged in." if Current.user.present?
    render inertia: "Authentication/Login"
  end

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      redirect_to after_authentication_url, notice: "Successfully logged in."
    else
      redirect_to new_session_path, alert: "Invalid email address or password. Please try again."
    end
  end

  def destroy
    terminate_session
    redirect_to new_session_path, notice: "You have been logged out."
  end
end
