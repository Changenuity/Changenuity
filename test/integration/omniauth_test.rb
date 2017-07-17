class OmniAuthTest < ActionDispatch::IntegrationTest
  def set_omniauth(options = {})
    credentials = {
      provider: :facebook,
      uuid: '1234',
      facebook: {
        email: 'foobar@example.com',
        first_name: 'Foo',
        last_name: 'Bar',
        gender: 'Female'
      }
    }.merge(options)
    provider = credentials[:provider]
    user_hash = credentials[provider]

    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[provider] = OmniAuth::AuthHash.new({
      provider: provider,
      uid: credentials[:uuid],
      info: user_hash,
      extra: {
        raw_info: user_hash
      }
    })
  end

  def set_invalid_omniauth(options = {})
    credentials = {
      provider: :facebook,
      invalid: :invalid_credentials
    }.merge(options)
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[credentials[:provider]] = credentials[:invalid]
  end

  test 'facebook' do
    set_omniauth
    get user_facebook_omniauth_authorize_path
    assert_response :redirect
    assert_redirected_to user_facebook_omniauth_callback_path
    follow_redirect!
    assert_redirected_to finish_signup_path(id: 1)
  end
end
