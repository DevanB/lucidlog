class ApplicationController < ActionController::Base
  include Authentication
  inertia_share flash: -> { flash.to_hash }, auth: { user: -> { inertia_user } }, name: Rails.application.config.application_name
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
end
