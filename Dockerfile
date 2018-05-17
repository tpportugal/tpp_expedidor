FROM node:8
ADD package.json /data/
WORKDIR /data
# 4: Install ember-cli and friends:
RUN set -ex \
  && npm install -g ember-cli \
  && npm install -g check-dependencies
# 5: Install watchman:
RUN set -ex \
  && export WATCHMAN_VERSION=4.6.0 \
  && curl -SL "https://github.com/facebook/watchman/archive/v${WATCHMAN_VERSION}.tar.gz" | tar -xz -C /tmp/ \
  && cd /tmp/watchman-${WATCHMAN_VERSION} \
  && ./autogen.sh \
  && ./configure \
  && apt-get update && apt-get install -y --no-install-recommends python-dev \
  && make \
  && make install \
  && apt-get purge -y --auto-remove python-dev \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/*
RUN yarn install
ADD . /data
