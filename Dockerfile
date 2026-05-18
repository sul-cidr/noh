FROM ruby:2.7

WORKDIR /opt

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -\
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install --global yarn \
  && gem install bundler:1.16.2

COPY _config.yml Gemfile Gemfile.lock package.json yarn.lock webpack.config.js .

COPY ./webpack/ .

RUN bundle config set path 'vendor/bundle'
RUN bundle install
RUN yarn
