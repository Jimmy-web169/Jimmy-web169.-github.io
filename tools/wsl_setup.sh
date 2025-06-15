#Remove the broken build
rbenv uninstall 3.2.8

#Be sure system OpenSSL dev files are present
sudo apt update
sudo apt install -y libssl-dev zlib1g-dev build-essential libreadline-dev

#Re-install Ruby, explicitly pointing to system OpenSSL
RUBY_CONFIGURE_OPTS="--with-openssl-dir=/usr" rbenv install 3.2.8
rbenv global 3.2.8

#Verify
ruby -ropenssl -e 'puts OpenSSL::OPENSSL_VERSION'
# → something like “OpenSSL 3.0.2 …”

# Install Bundler
gem install bundler

# Install the project dependencies
bundle install

# run the project
tools/run.sh
