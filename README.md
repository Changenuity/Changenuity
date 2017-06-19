# Changenuity
Welcome to our team Github repo! Here you can find all of the resources for our website (folders to be uploaded soon).

# Guidelines
1. Fork a branch to work on, and merge-push when you're done. Coordinate with team members who are working on similar things through Slack (https://changenuity.slack.com/messages/general/) to avoid clashes.
2. Unless you're just updating a small thing, write descriptive commit statements!
3. **Comment your code to make it understandable by everyone.**

# Quick start: Ruby on Rails
1. Install Ruby and Rails, maybe use [railsinstaller](http://railsinstaller.org/en) (I think I just manually installed ruby and then rails though)
   - Ruby 2.3.~ check with `ruby -v`
   - Rails 5.0.1~ check with `rails -v`
   - Bundler is for installing gems easily with the command `bundle install` (just letting you know, don't run it yet)
   - Sqlite is just for local testing database
   - Git is git (version control)
   - idk the other stuff in rails installer package, and I'm on Windows so...
2. Clone the repo `git clone https://github.com/Changenuity/Changenuity.git`
3. Go to directory `cd Changenuity` or just open command line in the folder
4. Run rails server with `rails server` or `rails s`
   - If you get any prompts to install gems, probably run `bundle install --without production`
   - If a certification error arises, two options:
     1. Open the gemfile (via windows explorer) and change Source from https://rubygems.org to http://rubygems.org (the difference is the s)
     2. In CLI `gem sources -r https://rubygems.org`
        then type `gem sources -a http://rubygems.org`
        To check your sources, type `gem sources`
   - if it says something about data migrations, probably run `rails db:migrate`
5. Navigate to `localhost:3000` in your web browser
6. *TADAA!!!* Oh yeah `ctrl-C` then`y` to stop the server

# Rails Application Guide
Rails generates a bunch of files and configs you mostly don't need to concern yourself with. If you want to check out what everything is for, go [here](https://www.railstutorial.org/book/beginning#table-rails_directory_structure).
- `app/assets` is where CSS, JS, and other assets like images should be
- `app/views` is where HTML is stored, the .erb extension indicates embedded ruby which is used for dynamic features and database storage!

Of course there are more things, but for now front-end is just this.

# Heroku Guide
To push the latest commit from develop into production, run `git push heroku develop` but remember, your changes will be visible on changenuity.com directly! Make sure everybody approves before you push!!

Whenever pushing anything to Heroku that requires migrations, remember to run `heroku rake db:migrate`

To browse the current state of the database, first download [PostgreSQL](https://www.postgresql.org/download/)
- run `heroku pg:backups:capture` to create a backup
- run `heroku pg:backups:download` to download it
- open the newly saved `latest.dump` from your current folder using PostgreSQL

To edit database entries directly, run `heroku run rails console`
- run `Model.all` to get a list of all entries of a certain model, e.g. `Project.all` or `User.all`
- run `Model.where(key1: "value1", key2: "value2")` to get a list of all entries that match a certain query, e.g. `Project.where(name: "UBC Orbit")`
- run `Model.find(id)` to get the entry with the given id, taken from the URL, e.g. `Project.find(7)` or `User.find(1)`
- run `first` or `last` to get the first or last entry in a list, e.g. `Project.where(location: "Vancouver").last`
- assign an entry to a variable to modify it, e.g. `p = Project.find(3)` or `p = User.where(email: "eugene@changenuity.com").first`
- then modify its attributes directly, e.g. `p.email = awesome@changenuity.com`
- run `save` to permanently save your update to the Heroku database

Rails console commands:

- `ActiveRecord::Base.connection.data_sources`
- ​