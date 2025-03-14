class HomeController < ApplicationController
  allow_unauthenticated_access only: %i[index]
  before_action :resume_session, only: %i[index]

  # GET /
  def index
    render inertia: "Home/Index"
  end
end
