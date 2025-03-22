class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  inertia_share flash: -> { flash.to_hash }, quote: { author: "J.K. Rowling", message: "In dreams, we enter a world that’s entirely our own." }

  def new
    render inertia: "Authentication/Register"
  end

  def create
    @user = User.new(user_params)

    if @user.save
      start_new_session_for @user
      redirect_to dashboard_path, notice: "You've successfully registered. Welcome!"
    else
      redirect_to new_user_path, inertia: { errors: @user.errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email_address, :password, :password_confirmation)
  end
end
