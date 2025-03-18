class AppPagesController < ApplicationController
  inertia_share flash: -> { flash.to_hash }

  # GET /dashboard
  def dashboard
    render inertia: "AppPage/Dashboard"
  end
end
