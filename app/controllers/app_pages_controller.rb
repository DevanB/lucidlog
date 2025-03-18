class AppPagesController < ApplicationController
  # GET /dashboard
  def dashboard
    render inertia: "AppPage/Dashboard"
  end
end
