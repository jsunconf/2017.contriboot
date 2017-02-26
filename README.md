# Contriboot

Manage Contributions and Interests. Based on Firebase.

The code is copied from last year's contriboot  https://github.com/jsunconf/contriboot
but with upgraded libs and a few code improvements due to version changes.

## Development

### Installation

Make sure you have the following commands installed:

```sh
brew install node
```

After cloning the repository, install all dependencies:

```sh
npm install
```

### Develop

Run the following command to start the server on localhost:

```sh
npm start
```
and point your browser to `http://localhost:8080`

### Deploy

To build the application, run the following command:

```sh
npm run build
```

and copy the generated `build/static/main.js` source to https://github.com/jsunconf/2017.jsunconf.eu/blob/master/content/scripts/contriboot.js
