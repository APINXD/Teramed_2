const pkg = require("./package");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
  },
  /* use https://admin.bro-js.ru/ to create config, navigations and features */
  navigations: {
    "teramed.main": "/Authorization",
    "teramed.main": "/UserPage"
  },
  features: {
    "teramed": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "teramed.api": "/api",
  },
};
