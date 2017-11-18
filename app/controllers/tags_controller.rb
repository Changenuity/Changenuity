class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.for_context(:tags)
  end

  def show
    @tag =  ActsAsTaggableOn::Tag.find(params[:id])
    @projects = Project.tagged_with(@tag.name)
  end
end
