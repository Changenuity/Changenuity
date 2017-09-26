class CategoriesController < ApplicationController
  def index
    @categories = ActsAsTaggableOn::Tag.for_context(:categories)
  end

  def show
    @category =  ActsAsTaggableOn::Tag.find(params[:id])
    @projects = Project.tagged_with(@category.name)
  end
end
