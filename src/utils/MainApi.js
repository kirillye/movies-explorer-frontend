import { MAIN_URL } from "./constants";

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _request(url, options) {
    return fetch(this.url + url, options).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return this._request("movies", {
      headers: this.headers,
      credentials: "include",
    });
  }

  getUserInfo() {
    return this._request("users/me", {
      headers: this.headers,
      credentials: "include",
    });
  }

  saveMovies(data) {
    return this._request(`movies`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        movieId: data.id,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${data.image.previewUrl}`,
      }),
    });
  }

  changeLikeCardStatus(id, statur) {
    if (statur) {
      return this._request(`cards/${id}/likes`, {
        method: "DELETE",
        headers: this.headers,
        credentials: "include",
      });
    } else {
      return this._request(`cards/${id}/likes`, {
        method: "PUT",
        headers: this.headers,
        credentials: "include",
      });
    }
  }

  deleteFromSaveMovies(id) {
    return this._request(`movies/${id}`, {
      method: "DELETE",
      headers: this.headers,
      credentials: "include",
    });
  }

  sendUserInfo(data) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
  }
}

export const api = new Api({
  url: MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
