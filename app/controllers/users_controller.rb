class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  inertia_share flash: -> { flash.to_hash }, quote: { author: "J.K. Rowling", message: "In dreams, we enter a world that’s entirely our own." }

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
