class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]
  before_action :resume_session, only: %i[new create]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  # GET /login
  def new
    render inertia: "Authentication/Login"
  end

  # POST /session - logs user in
  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      redirect_to after_authentication_url
    else
      redirect_to new_session_path, alert: "Try another email address or password."
    end
  end

  # DELETE /session - logs user out
  def destroy
    terminate_session
    flash[:notice] = "You have been logged out."
    redirect_to new_session_path
  end
end
