Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET_ID'],
           scope: 'email', info_fields: 'email', auth_type: 'rerequest'

  configure do |config|
    config.path_prefix = '/users/auth'
  end

  on_failure do |env|
    if env['omniauth.params'].present
      env['devise.mapping'] = Devise.mappings[:user]
    end
    Devise::OmniauthCallbacksController.action(:failure).call(env)
  end
end
