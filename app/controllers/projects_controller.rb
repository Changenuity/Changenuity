class ProjectsController < ApplicationController

  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      # Handle a successful save.
    else
      render 'new'
    end
  end

  private

    def project_params
      params.require(:project).permit(
				:name, :date, :location, :description, :parameters, :references)
    end
end
