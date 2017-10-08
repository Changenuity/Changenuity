class ProjectsController < ApplicationController
  before_action :ensure_signup_complete,  only: [:new, :create, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    if params[:userid]
      @projects = Project.where(user_id: params[:userid])
    else
      @projects = Project.search(params[:term])
    end
  end

  def show
    @project = Project.find(params[:id])
    if user_signed_in? && @project.user_id != current_user.id
      @myProposals = @project.proposals.select do |proposal|
        proposal.user_id == current_user.id
      end
    end
    if @user = User.find_by_id(@project.user_id)
      @authorName = @user.name || @user.username
    else
      @authorName = "Somebody"
    end
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      flash[:success] = "Thank you for posting to Changenuity!"
      redirect_to @project
    else
      render 'new'
    end
  end

  def edit
    @project = Project.find(params[:id])
    if current_user.id != @project.user_id
      redirect_to @project
    end
  end

  def update
    @project = Project.find(params[:id])
    if @project.update_attributes(project_params)
      # Handle successful update
      flash[:success] = "Project changed"
      redirect_to @project
    else
      render 'edit'
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :date, :location, :description, :parameters, :references, 
      :image, :tag_list, :user_id, :term, form_fields: [])
  end
end
