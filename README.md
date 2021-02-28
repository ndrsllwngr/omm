# Meme generator

- Online Multimedia - Group project (2020/2021)
- Preview: https://omm.vercel.app/

## ToC
- [Meme generator](#meme-generator)
  - [ToC](#toc)
  - [Dependency licenses](#dependency-licenses)
  - [External services](#external-services)
  - [Docker Image](#docker-image)
  - [Live Version](#live-version)
  - [Tech-Stack](#tech-stack)
  - [Getting started](#getting-started)
    - [System Requirements](#system-requirements)
    - [Setup](#setup)
    - [Firebase Configuration](#firebase-configuration)
  - [Commands](#commands)
    - [Application](#application)
    - [Docker](#docker)
    - [Dependency management](#dependency-management)
    - [Custom](#custom)
  - [Miscellaneous](#miscellaneous)
    - [Absolute Imports and Aliases](#absolute-imports-and-aliases)
    - [Inspiration](#inspiration)
    - [Resources](#resources)
  - [Contributors](#contributors)
    - [Individual contributions](#individual-contributions)


## Dependency licenses
- full list [/license-check.txt](/license-check.txt)
```bash
$ license-checker --summary
├─ MIT: 1643
├─ ISC: 133
├─ Apache-2.0: 106
├─ BSD-3-Clause: 80
├─ BSD-2-Clause: 41
├─ MIT*: 8
├─ CC0-1.0: 4
├─ Public Domain: 3
├─ 0BSD: 3
├─ (MIT OR CC0-1.0): 3
├─ Unlicense: 2
├─ CC-BY-4.0: 2
├─ (MIT OR Apache-2.0): 1
├─ MPL-2.0: 1
├─ Custom: http://github.com/substack/node-bufferlist: 1
├─ Apache*: 1
├─ BSD: 1
├─ (MIT OR WTFPL): 1
├─ BSD*: 1
├─ UNLICENSED: 1
├─ AFLv2.1,BSD: 1
├─ ODC-By-1.0: 1
├─ WTFPL: 1
├─ (BSD-3-Clause OR GPL-2.0): 1
├─ (WTFPL OR MIT): 1
├─ (MIT AND Zlib): 1
├─ (BSD-2-Clause OR MIT OR Apache-2.0): 1
├─ Custom: https://unpkg.com/realm-web: 1
├─ (MIT AND BSD-3-Clause): 1
├─ CC-BY-3.0: 1
├─ (MIT AND CC-BY-3.0): 1
└─ (MIT OR GPL-3.0): 1
```

## External services
- see https://docs.google.com/document/d/1BYGGoQ5xQih6ejDzN7d47otp-3Bx6y5KeCHntpYQpRY/edit?usp=sharing for how to setup and use them
- backup see [pdf file](/OMM%20Realm%20&%20Firebase%20Documentation.pdf)

## Docker Image
- file []()

## Live Version
- go to https://omm.vercel.app/

## Tech-Stack
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting started

### System Requirements
- [Node.js v14.15.1](https://nodejs.org/en/) or later
- MacOS, Windows (including WSL), and Linux are supported

### Setup
- `node --version && npm --version && yarn --version` - Ensures that required packages are installed.
- `yarn install` - Installs the project using [Yarn](https://yarnpkg.com/getting-started/install).

### Firebase Configuration

1. _[Create a Firebase project](https://console.firebase.google.com/u/0/) and add a new app to it._
2. Create a `.env.local` file and copy the contents of `.env.local.example` into it:

```bash
cp .env.local.example .env.local
```

3. Set each variable on `.env.local` with your Firebase Configuration (found in "Project settings").

## Commands

### Application
- `yarn dev` - Runs next which starts Next.js in development mode.
- `yarn build` - Runs next build which creates an optimized production build of your application. The output displays information about each route.
- `yarn start` - Runs next start which starts a Next.js production server.
- `yarn export` - (Do not use this command, since we are using APIs) Runs next export which allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server.
- `yarn storybook` - Runs storybook which starts the component explorer
- `yarn build:analyze` - Runs Webpack Bundle Analyzer which outputs htmls files for server bundle and for the browser bundle.

### Docker
- `docker build . -t omm:latest` - Builds docker image with name `omm` and tag `latest`
- `docker run -p 80:3000 omm:latest` - Runs docker image with name `omm` and tag `latest` and maps container port `3000` to port `80` (go to [http://localhost:80](http://localhost:80))
- `docker image save -o omm:latest.tar omm:latest ` - Saves the docker image with name `omm` and tag `latest` to the file `omm:latest.tar`
- `docker load -i omm:latest.tar` - Loads the docker image from the file `omm:latest.tar` into the local docker instance (execute run afterwards to run it)
- `docker compose up` - Use `docker compose` to build & run the application (on [http://localhost:3000](http://localhost:3000)) - **recommended for development**

### Dependency management
- `yarn add <package...>` - Installs the “latest” version of the package.
- `yarn remove <package...>` - Removes the package from your direct dependencies updating your package.json and yarn.lock files in the process.
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) upgrades your package.json dependencies to the latest versions, ignoring specified versions.

### Custom
- `yarn preview-export` - Runs a HTTP server (`python3 -m http.server`) in `out/` to preview the static HTML output from `yarn export`.
- `ncu -x postcss,postcss-nested,autoprefixer -u` - Update all dependencies but keep postcss at Version 7.


## Miscellaneous
### Absolute Imports and Aliases
- https://nextjs.org/blog/next-9-4#absolute-imports-and-aliases
- [`jsconfig`](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options) / [`tsconfig`](https://www.typescriptlang.org/tsconfig#baseUrl)

### Inspiration

- https://imgflip.com/memegenerator
- https://imgur.com/memegen/

### Resources

- https://nextjs.org/docs
- https://tailwindcss.com/
- https://github.com/salman-monetate/react-component-export-image

## Contributors

- Andreas Ellwanger
- Andreas Griesbeck
- Havy Ha
- Maximilian Rauh

### Individual contributions

Due to the small group size of 4 it is impossible for us to properly distinguish what of our project has been done by whom. We all worked on all parts of our application, especially since we mostly did “pair-programming” (with two or often all four of us working together). So all of us were equally involved in all parts of our application. We would be happy to answer questions about our development process, as well as our individual/collective contributions at the examination.
