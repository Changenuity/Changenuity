class ProposalsController < ApplicationController
  before_action :authenticate_user!

  def index # list all by/to current_user
    @proposals = Proposal.where(user_id: current_user.id)
  end

  def show
    @proposal = Proposal.find(params[:id])
  end

  def new
    @proposal = Proposal.new
  end

  def create
    @project = Project.find(params[:project_id])
    @proposal = @project.proposals.build(proposal_params)
    @proposal.user_id = current_user.id
    if @proposal.save
      flash[:success] = "Thank you for sending in your proposal!"
      ProposalMailer.new_proposal_email(@proposal).deliver_later
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

  def proposal_params
    params.require(:proposal).permit(:reason, :passions, :skills, :work, :commitment, :estimation, :linkedin)
  end
end
