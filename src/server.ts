import express = require('express');
import { HTTPHelper } from "./HTTPHelper";
import { InMemoryStorage } from "./InMemoryStorage";
import bodyParser from "body-parser";
import { JWTHelper } from "./TokenParser";

var cors = require('cors')
const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const httpHelper = new HTTPHelper();

const jwtHelper = new JWTHelper();
const inMemoryStorage = new InMemoryStorage(jwtHelper, httpHelper);

app.get('/health', function (req, res) {
    res.send("I'm a runnign service");
});


// User controller
app.post('/user/login', async function (req, res) {
    try {
        res.send(await inMemoryStorage.login(req.body.email, req.body.password));
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
});

app.post('/user/register', async function (req, res) {
    try {
        res.send(await inMemoryStorage.register(req.body.name, req.body.email, req.body.password));
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }

});

app.post('/user/movie', async function (req, res) {
    try {
        res.send(await inMemoryStorage.addMovie(jwtHelper.getAccessToken(req), req.body.movieId));
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }

});

app.delete('/user/movie', async function (req, res) {
    try {
        res.send(await inMemoryStorage.removeMovie(jwtHelper.getAccessToken(req), req.body.movieId));
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
});

app.listen(3002, function () {
    console.log('App is listening on port 3002!');
});
