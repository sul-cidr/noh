FROM ruby:2.6

WORKDIR /opt

COPY _config.yml Gemfile package.json webpack.config.js .

COPY ./webpack .

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -\
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install --global yarn \
  && gem install bundler:1.17.2

RUN bundle config set path 'vendor/bundle'
RUN bundle install
RUN yarn install
