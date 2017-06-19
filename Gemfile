source 'https://rubygems.org'

gem 'rails', '~> 5.0.1'
gem 'sprockets-rails', require: 'sprockets/railtie'
# Use Bootstrap as the front-end framework, depends on Tether
gem 'bootstrap', '~> 4.0.0.alpha6'
gem 'rails-assets-tether', '~> 1.1.1'
gem 'bcrypt', '3.1.11', :require => 'bcrypt',
  git: 'https://github.com/codahale/bcrypt-ruby.git'
# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Paperclip for images
gem 'paperclip', '~> 5.0.0'
# Use Amazon Web Services for image uploads
gem 'aws-sdk', '~> 2.3'
# Use Acts as Taggable On for tags
gem 'acts-as-taggable-on', '~> 4.0'
# Use Devise for authentication
gem 'devise'
gem 'omniauth-oauth2', '~> 1.3.1'
gem 'omniauth-google-oauth2'
gem 'omniauth-linkedin-oauth2'
gem 'omniauth-facebook'
gem 'omniauth-twitter'

group :development, :test do
  gem 'sqlite3'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# group :test do
#   gem 'rails-controller-testing'
#   gem 'minitest-reporters'
#   gem 'guard'
#   gem 'guard-minitest'
# end

group :production do
  gem 'pg'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
# Windows does not monitor directories for changes, so bundle the wdm gem
gem 'wdm', '>= 0.1.0', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
