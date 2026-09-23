FROM ruby:2.7

RUN set -eux; \
    snapshot="20260831T000000Z"; \
    printf 'deb [check-valid-until=no] http://snapshot.debian.org/archive/debian/%s bullseye main\n' "$snapshot" > /etc/apt/sources.list; \
    printf 'deb [check-valid-until=no] http://snapshot.debian.org/archive/debian-security/%s bullseye-security main\n' "$snapshot" >> /etc/apt/sources.list; \
    printf 'deb [check-valid-until=no] http://snapshot.debian.org/archive/debian/%s bullseye-updates main\n' "$snapshot" >> /etc/apt/sources.list; \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -\
  && apt-get update \
  && apt-get install -y nodejs \
  && npm install --global yarn \
  && gem install bundler:1.16.2

