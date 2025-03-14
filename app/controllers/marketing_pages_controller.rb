class MarketingPagesController < ApplicationController
  allow_unauthenticated_access

  # GET /
  def home
    render inertia: "MarketingPages/Home"
  end

  def pricing
  end

  def terms
  end

  def privacy
  end

  def contact
  end
end
