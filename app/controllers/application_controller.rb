class ApplicationController < ActionController::Base
  include Authentication
  inertia_share flash: -> { flash.to_hash }, auth: { user: -> { inertia_user } }, name: Rails.application.config.application_name
  before_action :can_access_app
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

  def current_user
    Current.user
  end

  def inertia_user
    return unless current_user
    {
      id: current_user.id,
      email: current_user.email_address,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      email_verified_at: current_user.email_verified_at,
      created_at: current_user.created_at,
      updated_at: current_user.updated_at
    }
  end

  # Ensures users have verified their email (or are within the grace period)
  # before allowing access to the application
  def can_access_app
    return unless current_user

    if !current_user.can_access_app?
      terminate_session
      redirect_to new_session_path, alert: "You need to verify your email address before using the app"
    end
  end
end
