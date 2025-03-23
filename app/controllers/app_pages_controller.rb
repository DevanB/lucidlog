class AppPagesController < ApplicationController
  inertia_share flash: -> { flash.to_hash }
  before_action :resume_session, only: %i[dashboard]

  def dashboard
    render inertia: "AppPage/Dashboard"
  end
end
