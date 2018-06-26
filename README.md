# prettier-eslint-verify

This is a simple tool that runs `prettier-eslint --list-different` and fails if any files are listed in the output.

**you must have [prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli) and [eslint](https://github.com/eslint/eslint) available as dependencies in your project**

Installation:

`npm install prettier-eslint-verify`

Usage:
`npx prettier-eslint-verify foo.js bar.js`

also takes globs

`npx prettier-eslint-verify folder/**/*.js`

