const fetch = require("node-fetch");

class Api {
  baseURL = "";
  headers = {
    "content-type": "application/json; charset=utf-8",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": `"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"`,
    "sec-ch-ua-mobile": "?0",
    accept: "*/*",
    credentials: "include"
  };

  requestInterceptor = config => config;
  responseInterceptor = res => res;

  async request(config) {
    config = this.requestInterceptor({
      baseURL: config.baseURL || this.baseURL,
      url: config.url,
      method: (config.method || "get").toLocaleUpperCase(),
      headers: {
        ...this.headers,
        ...config.headers
      },
      data: config.data
    });

    const response = await fetch(config.baseURL + config.url, {
      method: config.method,
      headers: config.headers,
      body: config.method !== "GET" ? JSON.stringify(config.data) : undefined
    });

    return this.responseInterceptor(await response.json());
  }

  async get(url, config) {
    return this.request({
      ...config,
      url,
      method: "get"
    });
  }

  async post(url, config) {
    return this.request({
      ...config,
      url,
      method: "post"
    });
  }
}

module.exports = Api;
