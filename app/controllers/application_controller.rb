class ApplicationController < ActionController::Base
  include Authentication
  inertia_share flash: -> { flash.to_hash }
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
