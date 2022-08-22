module.exports = {
  "*.{js,ts,tsx}": ["yarn run eslint:cmd --fix"],
  "*.{md,json,yml}": ["yarn run prettier:cmd --write"],
  "*.sol": ["forge snapshot --"],
  "package.json": [
    "yarn run npm-package-json:lint",
    "yarn run prettier:cmd --write",
  ],
};
