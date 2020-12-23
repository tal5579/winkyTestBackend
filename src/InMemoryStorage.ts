import { JWTHelper } from "./TokenParser";
import { HTTPHelper } from "./HTTPHelper";
import { IMovie } from "./interfaces";

export class InMemoryStorage {
    private users: User[];
    private jwtHelper: JWTHelper;
    private httpHelper: HTTPHelper;

    constructor(jwtHelper: JWTHelper, httpHelper: HTTPHelper) {
        this.users = [];
        this.jwtHelper = jwtHelper;
        this.httpHelper = httpHelper;
    }

    async register(name: string, email: string, password: string) {
        // check if user already exists:
        const exists: boolean = this.users.some((user: User) => user.email === email);
        if (exists) {
            throw new Error('User already exists');
        }

        // user doesn't exists, register the user
        const user = new User(name, email, password);
        this.users.push(user);
        return {
            token: this.jwtHelper.generateToken({ email }),
            catalog: await this.httpHelper.catalog(),
            wishlist: await user.getMovies(this.httpHelper),
            user
        };
    }

    async login(email: string, password: string) {
        const user = this.findUser(email);
        if (user.password !== password) {
            return new Error('Incorrect password');
        }
        return {
            token: this.jwtHelper.generateToken({ email }),
            catalog: await this.httpHelper.catalog(),
            wishlist: await user.getMovies(this.httpHelper),
            user
        };
    }

    async addMovie(token: string, movieId: string) { // 1538251548
        const email = this.jwtHelper.parse(token);
        const user: User = this.findUser(email);
        user.addMovie(movieId);
        return {
            wishlist: await user.getMovies(this.httpHelper) || []
        };
    }

    findUser(email: string): User {
        const user = this.users.find((user: User) => user.email === email);
        if (!user) {
            throw new Error('User not exists');
        }
        return user;
    }

    async removeMovie(token: string, movieId: string) {
        const email = this.jwtHelper.parse(token);
        const user: User = this.findUser(email);
        user.removeMovie(movieId);
        return {
            wishlist: await user.getMovies(this.httpHelper) || []
        };
    }
}

export class User {
    private wishList: string[];

    name: string;
    email: string;
    password: string;

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.wishList = [];
    }

    addMovie(movie: string) {
        if(!this.wishList.includes(movie)) {
            this.wishList.push(movie)
        }
    }

    async getMovies(httpHelper: HTTPHelper) {
        const movies = await httpHelper.catalog();
        let list = this.wishList.map((item) => movies.feed.entry.find((_entry: IMovie) => item === _entry.id.attributes["im:id"])).filter((item) => item) || [];
        this.wishList = list.map((_entry) => _entry.id.attributes["im:id"])
        return list;
    }

    removeMovie(movie: string) {
        this.wishList = this.wishList.filter(item => item !== movie);
    }
}
