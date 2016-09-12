module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "bundle.js": [
      "javascripts/bundle.js"
    ],
    "directbond.js": [
      "javascripts/angular.js",
      "javascripts/directbond.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  },
  networks: {
    "edgware": {
      network_id: 909,
    }
  }
};
