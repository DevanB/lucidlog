class MarketingPagesController < ApplicationController
  allow_unauthenticated_access

  # GET /
  def home
    render inertia: "MarketingPages/Home"
  end
end
