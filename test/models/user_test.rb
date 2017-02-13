require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
  	@user = User.new(name: "Example User", email: "user@example.com")
  end

  test "should be valid" do
  	assert @user.valid?
  end

  test "name should be present" do
  	@user.name = "   "
  	assert_not @user.valid?
  end

  test "email should be present" do
  	@user.email = "     "
  	assert_not @user.valid?
  end

  test "initialized empty or 1 nil is invalid" do
  	emptyUser = User.new(email: "hi@hello.com")
  	assert_nil(emptyUser.name)
  	assert_equal(emptyUser.email, "hi@hello.com")
  	assert_not emptyUser.valid?
  end
end
