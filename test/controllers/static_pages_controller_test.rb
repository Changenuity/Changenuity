require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @base_title = "Changenuity"
  end

  test 'should get root' do
    get root_path
    assert_response :success
    assert_select 'title', @base_title
  end

  test 'should get home' do
    get home_path
    assert_response :success
    assert_select 'title', @base_title
  end

  test 'should get about' do
    get about_path
    assert_response :success
    assert_select 'title', "About - #{@base_title}"
  end

  test 'should get contact' do
    get contact_path
    assert_response :success
    assert_select 'title', "Contact - #{@base_title}"
  end

  test 'should get privacy' do
    get privacy_path
    assert_response :success
    assert_select 'title', "Privacy Policy - #{@base_title}"
  end

  test 'should get tos' do
    get tos_path
    assert_response :success
    assert_select 'title', "Terms of Service - #{@base_title}"
  end
end
