class SessionsController < ApplicationController

  def new
  end

  def enter(user)
    flash[:success] = "You are now logged in!"
    log_in user
    params[:session][:remember_me] == '1' ? remember(user) : forget(user)
    redirect_to user
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      enter(user)
    else
      flash.now[:danger] = "Invalid email/password combination!"
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  def oauth
    user = User.from_omniauth(request.env["omniauth.auth"])
    enter(user)
  end
end
