# It's fine! - A meme site.

- Online Multimedia - Group project (2020/2021)
- Live version https://omm.vercel.app/

---

- [It's fine! - A meme site.](#its-fine---a-meme-site)
  - [Introduction](#introduction)
    - [How to run the project?](#how-to-run-the-project)
    - [How to run cypress tests?](#how-to-run-cypress-tests)
    - [Which features did we implement?](#which-features-did-we-implement)
    - [Which external services do we use? How to setup and configure these services?](#which-external-services-do-we-use-how-to-setup-and-configure-these-services)
    - [Which dependencies do we use? What are their licenses?](#which-dependencies-do-we-use-what-are-their-licenses)
    - [Sitemap - Which pages and api routes do we provide?](#sitemap---which-pages-and-api-routes-do-we-provide)
  - [Getting started](#getting-started)
    - [System Requirements](#system-requirements)
    - [Setup](#setup)
    - [Firebase Configuration](#firebase-configuration)
    - [MongoDB Configuration](#mongodb-configuration)
    - [ApiFlash Configuration](#apiflash-configuration)
  - [Commands](#commands)
    - [Application](#application)
    - [Docker](#docker)
    - [Dependency management](#dependency-management)
    - [Custom](#custom)
  - [Miscellaneous](#miscellaneous)
    - [Tech stack](#tech-stack)
    - [Absolute Imports and Aliases](#absolute-imports-and-aliases)
    - [Inspiration](#inspiration)
    - [Resources](#resources)
  - [Contributors](#contributors)
    - [Individual contributions](#individual-contributions)


## Introduction
Since we use cloud-based services such as MongoDB Atlas, an internet connection is required.

### How to run the project?
- You can access a live version of this project on https://omm.vercel.app/
- You can run the project locally via either of the following options (internet connection is required)
  - download the pre-built [docker image](https://drive.google.com/file/d/1AR0QVOZGtnCaUxOxx_95HMZeORahmobw/view?usp=sharing) and run the following command `docker load -i omm-latest.tar && docker run -p 80:3000 omm:latest` and afterwards visit [http://localhost:80](http://localhost:80)
  - navigate into the "omm-main" folder and run `docker compose up` and afterwards visit [http://localhost:3000/](http://localhost:3000/)
  - navigate into the "omm-main" folder and run `yarn install && yarn dev` and afterwards visit [http://localhost:3000/](http://localhost:3000/)
  - for more details see [Getting started](#getting-started)

### How to run cypress tests?
- Run our cypress tests with `yarn install && yarn cy:run`

### Which features did we implement?
- See the project feature checklist (excel sheet) [project_features_checklist.xlsx](/project_features_checklist.xlsx)

### Which external services do we use? How to setup and configure these services?
- See [Google Doc](https://docs.google.com/document/d/1BYGGoQ5xQih6ejDzN7d47otp-3Bx6y5KeCHntpYQpRY/edit?usp=sharing) / [.pdf file](/OMM%20Realm%20&%20Firebase%20Documentation.pdf) for how to setup and configure our used external services.
- The following external cloud services are used
  - MongoDB Realm https://realm.mongodb.com/
  - MongoDB Atlas https://cloud.mongodb.com/
  - Firebase (Storage only) https://console.firebase.google.com/
  - ApiFlash https://apiflash.com/

### Which dependencies do we use? What are their licenses?
- dependency list [package.json](/package.json)
- full license list [license-check.txt](/license-check.txt)
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
├─ UNLICENSED: 1 (OUR OWN PROJECT)
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

### Sitemap - Which pages and api routes do we provide?
```js
22:17:35.313    Page                                                           Size     First Load JS
22:17:35.313    ┌ ○ /                                                          956 B           326 kB
22:17:35.314    ├   /_app                                                      0 B             275 kB
22:17:35.314    ├ ○ /403                                                       162 B           275 kB
22:17:35.314    ├ ○ /404                                                       955 B           276 kB
22:17:35.314    ├ λ /api/cors                                                  0 B             275 kB
22:17:35.314    ├ λ /api/meme                                                  0 B             275 kB
22:17:35.314    ├ λ /api/meme/[id]                                             0 B             275 kB
22:17:35.314    ├ λ /api/meme/image/[id]                                       0 B             275 kB
22:17:35.314    ├ λ /api/meme/set                                              0 B             275 kB
22:17:35.314    ├ ○ /create                                                    225 kB          531 kB
22:17:35.314    ├ ○ /login                                                     1.36 kB         283 kB
22:17:35.314    ├ ○ /meme/[id]                                                 4.23 kB         330 kB
22:17:35.314    ├ ○ /profile                                                   5.55 kB         284 kB
22:17:35.314    └ ○ /signup                                                    1.41 kB         283 kB
22:17:35.315    λ  (Lambda)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
22:17:35.315    ○  (Static)  automatically rendered as static HTML (uses no initial props)
22:17:35.315    ●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
22:17:35.315       (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
- to explore our API, please make use of [rest-api.postman_collection.json](/rest-api.postman_collection.json) and import it into [Postman](https://www.postman.com/)

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

### MongoDB Configuration
See [Which external services do we use? How to setup and configure these services?](#which-external-services-do-we-use-how-to-setup-and-configure-these-services) for more information.

### ApiFlash Configuration
See [Which external services do we use? How to setup and configure these services?](#which-external-services-do-we-use-how-to-setup-and-configure-these-services) for more information.

## Commands

### Application
- `yarn dev` - Runs next, which starts Next.js in development mode.
- `yarn build` - Runs next build, which creates an optimized production build of your application. The output displays information about each route.
- `yarn start` - Runs next start, which starts a Next.js production server.
- `yarn export` - (Do not use this command, since we are using APIs) Runs next export, which allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server.
- `yarn storybook` - Runs storybook which starts the component explorer
- `yarn build:analyze` - Runs Webpack Bundle Analyzer, which outputs HTML files for server bundle and the browser bundle.
- `yarn cy:run` - Runs cypress test.

### Docker
- `docker build . -t omm:latest` - Builds docker image with name `omm` and tag `latest`
- `docker run -p 80:3000 omm:latest` - Runs docker image with name `omm` and tag `latest` and maps container port `3000` to port `80` (go to [http://localhost:80](http://localhost:80))
- `docker image save -o omm-latest.tar omm:latest ` - Saves the docker image with name `omm` and tag `latest` to the file `omm:latest.tar`
- `docker load -i omm-latest.tar` - Loads the docker image from the file `omm:latest.tar` into the local docker instance (execute run afterwards to run it)
- `docker compose up` - Use `docker compose` to build & run the application (on [http://localhost:3000](http://localhost:3000)) - **recommended for development**

### Dependency management
- `yarn add <package...>` - Installs the "latest" version of the package.
- `yarn remove <package...>` - Removes the package from your direct dependencies, updating your package.json and yarn.lock files in the process.
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) upgrades your package.json dependencies to the latest versions, ignoring specified versions.

### Custom
- `yarn preview-export` - Runs a HTTP server (`python3 -m http.server`) in `out/` to preview the static HTML output from `yarn export`.
- `ncu -x postcss,postcss-nested,autoprefixer,next -u` - Update all dependencies but keep postcss at Version 7.


## Miscellaneous

### Tech stack

- Next.js
- React
- GraphQL
- Tailwind CSS
- Cypress
- Storybook
- Fabric.js
- many more...
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

Due to the small group size of 4, it is impossible for us to properly distinguish what of our project has been done by whom. We all worked on all parts of our application, especially since we mostly did "pair-programming" (with two or often all four of us working together). So all of us were equally involved in all parts of our application. We would be happy to answer questions about our development process and our individual/collective contributions at the examination.
