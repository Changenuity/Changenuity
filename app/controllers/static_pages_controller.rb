class StaticPagesController < ApplicationController
  def weebly
    redirect_to "http://changenuity.weebly.com/"
  end

  def home
  end

  def about
  end

  def contact
  end
end
