# Simple connection test

An extremely simple connection tester app. I created this for use in a public cloud to test networking over various protocols. You send a POST request to this app with the connection details, and the app will proxy your request through itself and return the results back to you.

## Config

The following environment variables are required:

* `PORT`: the port the app's web server will listen
* `SECRET`: The pre-shared key required to authenticate to the app

## Authentication

To authenticate, set the `X-SECRET-KEY` header to the pre-shared key passed in as an environment variable

## HTTP

To make an HTTP request, send a `POST` request to `/http` with an [Axios config object](https://github.com/axios/axios#axios-api)

```bash
LISTENING_ADDR='http://localhost:3000'

curl -w "\n" -H "X-SECRET-KEY: testing" -H "Content-Type: application/json" -X POST --data '{"method": "get", "timeout": 1000, "url": "https://ifconfig.co"}' ${LISTENING_ADDR}/http
```

## Test locally

```bash
npm install
npm test
```

The required config variables will automatically be set to:

* `PORT`: 3000
* `SECRET`: testing
