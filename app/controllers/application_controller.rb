class ApplicationController < ActionController::Base
  include Authentication
  inertia_share flash: -> { flash.to_hash }, auth: { user: -> { inertia_user } }, name: Rails.application.config.application_name
  before_action :verify_user_access
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

  def current_user
    Current.user
  end

  def inertia_user
    return nil unless current_user.present?
    {
      id: current_user.try(:id),
      email: current_user.try(:email_address)
    }
  end

  def verify_user_access
    return nil if current_user.nil?

    if !current_user.can_access_app?
      terminate_session
      redirect_to new_session_path, alert: "You need to verify your email address before using the app"
    end
  end
end
