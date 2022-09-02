module.exports = {
  "*.{js,ts,tsx}": ["yarn run eslint:cmd --fix"],
  "*.{md,json,yml}": ["yarn run prettier:cmd --write"],
  "*.sol": ["yarn run forge:snapshot:cmd", "yarn run solhint:cmd --fix"],
  "package.json": [
    "yarn run npm-package-json:lint",
    "yarn run prettier:cmd --write",
  ],
};
