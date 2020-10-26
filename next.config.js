const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  })
);
