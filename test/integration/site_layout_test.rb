require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest

  test 'layout links' do
    get root_path
    assert_template 'static_pages/home'
    assert_select 'a[href=?]', home_path
    assert_select 'a[href=?]', browse_path
  end

  test 'full title' do
    get root_path
    assert_select 'title', full_title
    get home_path
    assert_select 'title', full_title
    get about_path
    assert_select 'title', full_title('About')
    get contact_path
    assert_select 'title', full_title('Contact')
    get privacy_path
    assert_select 'title', full_title('Privacy Policy')
    get tos_path
    assert_select 'title', full_title('Terms of Service')
  end
end
