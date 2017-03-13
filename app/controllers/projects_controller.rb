class ProjectsController < ApplicationController

  def index
    @projects = Project.all
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
      params.require(:project).permit(
        :name, :date, :location, :description, :parameters, :references, :image)
    end
end
