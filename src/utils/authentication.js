import { MAIN_URL } from "./constants";

class Authentication {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  signUp(email, password, name) {
    return this._request("signup", {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        password: password,
        email: email,
        name: name,
      }),
    });
  }

  signIn(userEmail, userPassword) {
    return this._request("signin", {
      method: "POST",
      headers: this.headers,
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
  }

  signOut() {
    return this._request("signout", {
      method: "POST",
      headers: this.headers,
      credentials: "include",
    });
  }

  tokenCheck() {
    return fetch(`${this.url}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._getResponseData);
  }

  _request(url, options) {
    return fetch(this.url + url, options).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.statusText === "Unauthorized") {
      return Promise.reject(`Ошибка: Не правильный логин или пароль`);
    }
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const authentication = new Authentication({
  url: MAIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
