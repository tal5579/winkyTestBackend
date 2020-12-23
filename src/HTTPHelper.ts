import axios from "axios";

export class HTTPHelper {
    constructor() {
    }

    private async syncGet(url): Promise<any> {
        return await new Promise((resolve, reject) => {
            axios.get(url)
                .then(function (response) {
                    // handle success
                    resolve(response.data)
                })
                .catch(function (error) {
                    // handle error
                    reject(error);
                });
        })
    }

    public async catalog() {
        return await this.syncGet("https://itunes.apple.com/us/rss/topmovies/limit=25/json");
    }
}
