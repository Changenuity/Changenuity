class ProjectsController < ApplicationController
  before_action :ensure_signup_complete,  only: [:new, :create, :edit, :update, :destroy]
  before_action :authenticate_user!,      only: [:new, :create, :edit, :update, :destroy]

  def index
    @projects = Project.search(params[:term])
  end

  def show
    @project = Project.find(params[:id])
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
    params.require(:project).permit(:name, :date, :location,
      :description, :parameters, :references, :image, :tag_list, :term)
  end
end
