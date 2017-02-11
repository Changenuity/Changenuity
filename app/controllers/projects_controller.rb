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

  def tag_cloud
    @tags = Project.tag_counts_on(:tags)
  end

  private

  def project_params
    params.require(:project).permit(:name, :date, :location,
      :description, :parameters, :references, :image, :tag_list)
  end
end
