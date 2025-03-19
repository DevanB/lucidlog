class AppPagesController < ApplicationController
  inertia_share flash: -> { flash.to_hash }

  def dashboard
    render inertia: "AppPage/Dashboard"
  end
end
