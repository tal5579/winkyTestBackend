"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const HTTPHelper_1 = require("./HTTPHelper");
const InMemoryStorage_1 = require("./InMemoryStorage");
const body_parser_1 = __importDefault(require("body-parser"));
const TokenParser_1 = require("./TokenParser");
var cors = require('cors');
const app = express();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors());
const httpHelper = new HTTPHelper_1.HTTPHelper();
const jwtHelper = new TokenParser_1.JWTHelper();
const inMemoryStorage = new InMemoryStorage_1.InMemoryStorage(jwtHelper, httpHelper);
app.get('/health', function (req, res) {
    res.send("I'm a runnign service");
});
// User controller
app.post('/user/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield inMemoryStorage.login(req.body.email, req.body.password));
        }
        catch (error) {
            return res.status(400).json({ error: error.toString() });
        }
    });
});
app.post('/user/register', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield inMemoryStorage.register(req.body.name, req.body.email, req.body.password));
        }
        catch (error) {
            return res.status(400).json({ error: error.toString() });
        }
    });
});
app.post('/user/movie', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield inMemoryStorage.addMovie(jwtHelper.getAccessToken(req), req.body.movieId));
        }
        catch (error) {
            return res.status(400).json({ error: error.toString() });
        }
    });
});
app.delete('/user/movie', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.send(yield inMemoryStorage.removeMovie(jwtHelper.getAccessToken(req), req.body.movieId));
        }
        catch (error) {
            return res.status(400).json({ error: error.toString() });
        }
    });
});
app.listen(3002, function () {
    console.log('App is listening on port 3002!');
});
//# sourceMappingURL=server.js.map