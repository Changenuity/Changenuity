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
   - If you get any prompts to install gems, do it. Probably `bundle install` it will tell you
5. Navigate to `localhost:3000` in your web browser
6. *TADAA!!!* Oh yeah `ctrl-C` then`y` to stop the server