class ProposalMailer < ApplicationMailer
  def new_proposal_email(proposal)
    @proposal = proposal
    @project = @proposal.project
    @user = @project.user
    @url = project_url(@project)
    email_name = "\"#{@user.name}\" <#{@user.email}>"
    mail(to: email_name, subject: "#{@project.name} has a new proposal on Changenuity")
  end
end
