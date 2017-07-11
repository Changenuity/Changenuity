class ProposalsController < ApplicationController
	before_action :authenticate_user!
	before_action :set_references #, only: [:show, :edit, :update, :destroy]

	def index
    @proposals = Proposal.all
    # TODO set to current_user's
  end

  def show
    @proposal = Proposal.find(params[:id])
  end

  def new
    @proposal = Proposal.new
    # TODO need to get current_user and @project to associate....
  end

  def create
    @project = Project.find(params[:project_id])
    @proposal = @project.proposals.build(proposal_params)
    if @proposal.save
      flash[:success] = "Thank you for sending in your proposal!"
    else
      flash[:error] = "Failed to submit proposal..."
    end
    redirect_to project_path(@project)
  end

  def edit
    @proposal = Proposal.find(params[:id])
  end

  def update
    @proposal = Proposal.find(params[:id])
    if @proposal.update_attributes(proposal_params)
      # Handle successful update
      flash[:success] = "Proposal changed"
      redirect_to @proposal
    else
      render 'edit'
    end
  end

  private

  def set_references
  	@user = current_user
  	# @projects = Project.find(params[:project_id])
  end

  def proposal_params
    params.require(:proposal).permit(:content)
  end
end