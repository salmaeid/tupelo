import { Constants, Location } from "expo";

import timeoutPromise from "./timeout-promise";

class Api {
  constructor(baseUrl, timeout) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.userToken = null;
  }

  setUserToken(userToken) {
    this.userToken = userToken;
    this.updateLocation();
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

  async put(url, data) {
    const response = await timeoutPromise(
      this.timeout,
      "Request timed out",
      fetch(this.baseUrl + url, {
        method: "PUT",
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

  async updateLocation() {
    try {
      await Location.requestPermissionsAsync();
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });

      await this.put("/settings/location", [
        location.coords.longitude,
        location.coords.latitude
      ]);
    } catch (error) {
      // Do nothing
    }
  }
}

export default new Api(Constants.manifest.extra.apiUrl, 5000);
