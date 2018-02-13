class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy, :finish_signup]
  before_action :ensure_signup_complete, only: [:new, :create, :update, :destroy]

  def show
    @projects = Project.where(user_id: @user.id)
    @proposals = Proposal.where(user_id: @user.id)
  end

  def edit
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        sign_in(@user == current_user ? @user : current_user, bypass: true)
        format.html { redirect_to @user, notice: 'Your profile was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def finish_signup
    if request.patch? && params[:user] && params[:user][:email]
      if @user.update(user_params)
        sign_in(@user, bypass: true)
        redirect_to @user, notice: 'Your profile was successfully updated.'
      else
        @show_errors = true
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to root_url }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    if params[:id]
      @user = User.find(params[:id])
    elsif try = User.find_by_username(params["username"])
      @user = try
    else
      flash[:error] = "Could not find user."
      redirect_to home_path
    end
  end

  def user_params
    accessible = [ :name, :username, :email,
      :location, :biography, :experience, :organization, :passions, :skills, :work, :commitment, :image ]
    accessible << [ :password, :password_confirmation ] unless params[:user][:password].blank?
    params.require(:user).permit(accessible)
  end
end
