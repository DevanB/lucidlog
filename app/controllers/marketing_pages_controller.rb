class MarketingPagesController < ApplicationController
  allow_unauthenticated_access

  inertia_share flash: -> { flash.to_hash }

  def home
    render inertia: "MarketingPages/Home"
  end
end
