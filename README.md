# TPP Dispatcher
[![Docker hub](https://img.shields.io/badge/Docker%20Hub-tpportugal/tpp%5F_expedidor-0db7ed.svg)](https://hub.docker.com/r/tpportugal/tpp_expedidor/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0f2f2dca11cf4119804246b0d07f2dbf)](https://app.codacy.com/app/TPP/tpp_expedidor?utm_source=github.com&utm_medium=referral&utm_content=tpportugal/tpp_expedidor&utm_campaign=badger)

Used to administer and monitor the [TPP Datastore](https://github.com/tpportugal/tpp_banco_de_dados) back-end.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Docker](https://github.com/docker/docker-install)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/tpportugal/tpp_expedidor.git`
* `cd tpp_expedidor`
* `yarn install`
* `./build.sh`

## Running / Development

* `./run.sh`
* Visit your app at [http://localhost:8003](http://localhost:8003).
* Visit your tests at [http://localhost:8003/tests](http://localhost:8003/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `docker run --rm -p 8003:4200 tpportugal/tpp_expedidor:latest ember test`
* `docker run --rm -p 8003:4200 tpportugal/tpp_expedidor:latest ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `docker run --rm -p 8003:4200 tpportugal/tpp_expedidor:latest ember build` (development)
* `docker run --rm -p 8003:4200 tpportugal/tpp_expedidor:latest ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
