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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.InMemoryStorage = void 0;
class InMemoryStorage {
    constructor(jwtHelper, httpHelper) {
        this.users = [];
        this.jwtHelper = jwtHelper;
        this.httpHelper = httpHelper;
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if user already exists:
            const exists = this.users.some((user) => user.email === email);
            if (exists) {
                throw new Error('User already exists');
            }
            // user doesn't exists, register the user
            const user = new User(name, email, password);
            this.users.push(user);
            return {
                token: this.jwtHelper.generateToken({ email }),
                catalog: yield this.httpHelper.catalog(),
                wishlist: yield user.getMovies(this.httpHelper),
                user
            };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.findUser(email);
            if (user.password !== password) {
                return new Error('Incorrect password');
            }
            return {
                token: this.jwtHelper.generateToken({ email }),
                catalog: yield this.httpHelper.catalog(),
                wishlist: yield user.getMovies(this.httpHelper),
                user
            };
        });
    }
    addMovie(token, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = this.jwtHelper.parse(token);
            const user = this.findUser(email);
            user.addMovie(movieId);
            return {
                wishlist: (yield user.getMovies(this.httpHelper)) || []
            };
        });
    }
    findUser(email) {
        const user = this.users.find((user) => user.email === email);
        if (!user) {
            throw new Error('User not exists');
        }
        return user;
    }
    removeMovie(token, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = this.jwtHelper.parse(token);
            const user = this.findUser(email);
            user.removeMovie(movieId);
            return {
                wishlist: (yield user.getMovies(this.httpHelper)) || []
            };
        });
    }
}
exports.InMemoryStorage = InMemoryStorage;
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.wishList = [];
    }
    addMovie(movie) {
        if (!this.wishList.includes(movie)) {
            this.wishList.push(movie);
        }
    }
    getMovies(httpHelper) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield httpHelper.catalog();
            let list = this.wishList.map((item) => movies.feed.entry.find((_entry) => item === _entry.id.attributes["im:id"])).filter((item) => item) || [];
            this.wishList = list.map((_entry) => _entry.id.attributes["im:id"]);
            return list;
        });
    }
    removeMovie(movie) {
        this.wishList = this.wishList.filter(item => item !== movie);
    }
}
exports.User = User;
//# sourceMappingURL=InMemoryStorage.js.map