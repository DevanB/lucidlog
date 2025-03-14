class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[new]

  inertia_share flash: -> { flash.to_hash }

  # GET /register
  def new
    render inertia: "Authentication/Register"
  end

  # POST /users - create a new user
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user, notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end
end
