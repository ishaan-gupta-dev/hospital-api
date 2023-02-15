require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port || 8000;
const db = require('./config/mongoose');
const path = require('path');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const customMiddleware = require('./config/middleware');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');


/* for broswer reload after changes in code */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


app.use(express.json()); // use the express json
app.use(connectLiveReload()); // use the connect live reload
app.use(express.urlencoded({ extended: true })); // parsing incoming requests with urlencoded payloads

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes')); // use express routers


app.listen(port, function (err) { // start the app
    if (err) {
        console.log(`Error in running the server on port: ${err}!`);
    }
    console.log(`Server running on port: ${port}!`);
});