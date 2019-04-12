import { Constants } from "expo";

import timeoutPromise from "./timeout-promise";

class Api {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.userToken = null;
  }

  setUserToken(userToken) {
    this.userToken = userToken;
  }

  async get(url, data) {
    const response = await timeoutPromise(
      this.timeout,
      "Request timed out",
      fetch(this.baseUrl + url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: this.userToken
            ? `Bearer ${this.userToken}`
            : undefined,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    );

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }

    throw await response.json();
  }

  async post(url, data) {
    const response = await timeoutPromise(
      this.timeout,
      "Request timed out",
      fetch(this.baseUrl + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: this.userToken
            ? `Bearer ${this.userToken}`
            : undefined,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    );

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }

    throw await response.json();
  }

  async delete(url) {
    const response = await timeoutPromise(
      this.timeout,
      "Request timed out",
      fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: this.userToken
            ? `Bearer ${this.userToken}`
            : undefined,
          "Content-Type": "application/json"
        }
      })
    );

    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }

    throw await response.json();
  }
}

export default new Api(Constants.manifest.extra.apiUrl, 1000);
