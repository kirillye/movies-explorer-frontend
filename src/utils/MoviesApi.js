import { MOVIES_URL } from "./constants";

class MoviesApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _request(url, options) {
    return fetch(this.url + url, options).then(this._getResponseData);
  }

  getCards() {
    return this._request("", {
      headers: this.headers,
    });
  }
}

export const moviesApi = new MoviesApi({
  url: MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
