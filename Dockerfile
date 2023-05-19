FROM ruby:2.7

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -\
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install --global yarn \
  && gem install bundler:1.16.2

