const api = {
  apiPrefix: "https://revenue-plus-plus.herokuapp.com/api",

  async get(endpoint) {
    return await fetch(`${this.apiPrefix}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(this.handleResponse);
  },

  async post(endpoint, body) {
    return await fetch(`${this.apiPrefix}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    }).then(this.handleResponse);
  },

  async put(endpoint, body) {
    return await fetch(`${this.apiPrefix}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    }).then(this.handleResponse);
  },

  handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  },
};

export default api;
