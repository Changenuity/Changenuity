Rails.application.config.middleware.use OmniAuth::Builder do
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
