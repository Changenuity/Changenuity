OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_APP_ID'], ENV['GOOGLE_SECRET_KEY'], {client_options: {ssl: {ca_file: '/usr/lib/ssl/certs/ca-certificates.crt'}}}
end
