require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: "Example User",
                        username: "example_user",
                        email: "user@example.com",
                        password: "correct horse battery staple",
										    password_confirmation: "correct horse battery staple")
    @copy = User.create(name: "Copy User",
                        username: "copy_user",
                        email: "copy@changenuity.com",
                        password: "Tr0ub4dor&3",
										    password_confirmation: "Tr0ub4dor&3")
  end

  test "should be valid" do
    assert @user.valid?
  end


  # name tests

  test "name should be editable" do
    @user.name = "foobar"
    assert @user.valid?
    @user.save
    assert_equal "foobar", @user.reload.name
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = "   "
    assert_not @user.valid?
  end

  test "name should not be too long" do
    @user.name = "a" * 256
    assert_not @user.valid?
  end

  test "name should not be unique" do
    @user.name = @copy.name
    assert @user.valid?
  end


  # username tests

  test "username should be editable" do
    @user.username = "foobar"
    assert @user.valid?
    @user.save
    assert_equal "foobar", @user.reload.username
    assert @user.valid?
  end

  test "username should be present" do
    @user.username = "   "
    assert_not @user.valid?
  end

  test "username should not be too long" do
    @user.username = "a" * 256
    assert_not @user.valid?
  end

  test "username should be unique" do
    @user.username = @copy.username
    assert_not @user.valid?
  end


  # email tests

  test "email should be editable" do
    @user.update(email: "new_email@l.org")
    assert @user.valid?
    assert_not_equal "new_email@l.org", @user.reload.email
    @user.confirm
    assert_equal "new_email@l.org", @user.reload.email
    assert @user.valid?
  end

  test "email should be present" do
    @user.update(email: "")
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.update(email: "a" * 244 + "@example.com")
    assert_not @user.valid?
  end

  test "email should be unique" do
    @user.update(email: @copy.email)
    assert_not @user.valid?
  end

  test "email addresses should be downcased on save" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @user.update(email: mixed_case_email)
    assert_not_equal mixed_case_email.downcase, @user.reload.email
    @user.confirm
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "email format should be valid" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.update(email: valid_address)
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email format should not be invalid" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@web.
                           foo@bar..com hello@example_dot_com]
    invalid_addresses.each do |invalid_address|
      @user.update(email: invalid_address)
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end
end
