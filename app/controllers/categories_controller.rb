class CategoriesController < ApplicationController
  def index
    @categories = ActsAsTaggableOn::Tag.all[0..8]
  end

  def show
    @category = ActsAsTaggableOn::Tag.find(params[:id])
    @projects = Project.tagged_with(@category.name)
  end
end
