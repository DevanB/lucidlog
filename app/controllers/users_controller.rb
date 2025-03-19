class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[new]

  inertia_share flash: -> { flash.to_hash }
  inertia_share name: "LucidLog"
  inertia_share quote: { author: "Devan", message: "Do the hard right, not the easy wrong." }

  def new
    render inertia: "Authentication/Register"
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user, notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end
end
