module.exports = {
  contextName: "/springboot_base",
  proxyTable: {
    "/springboot_base/*": {
      "target": "http://localhost:8077",
      "secure": false,
      "xfwd": true
    }
  },
  debugMode: true,
  login: {
    captcha: true,
    stateless: false
  }
};
