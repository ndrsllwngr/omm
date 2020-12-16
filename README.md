# Meme generator

- Online Multimedia - Group project (2020/2021)
- Preview: https://omm.vercel.app/

## Tech-Stack
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting started

### System Requirements
- [Node.js 12.16](https://nodejs.org/en/) or later
- MacOS, Windows (including WSL), and Linux are supported

### Setup
- `node --version && npm --version && yarn --version` - Ensures that required packages are installed.
- `yarn install` - Installs the project using [Yarn](https://yarnpkg.com/getting-started/install).

## Firebase Configuration

1. _[Create a Firebase project](https://console.firebase.google.com/u/0/) and add a new app to it._
2. Create a `.env.local` file and copy the contents of `.env.local.example` into it:

```bash
cp .env.local.example .env.local
```

3. Set each variable on `.env.local` with your Firebase Configuration (found in "Project settings").

### Commands
- `yarn dev` - Runs next which starts Next.js in development mode.
- `yarn build` - Runs next build which creates an optimized production build of your application. The output displays information about each route.
- `yarn start` - Runs next start which starts a Next.js production server.
- `yarn export` - (Do not use this command, since we are using APIs) Runs next export which allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server.
- `yarn storybook` - Runs storybook which starts the component explorer
- `yarn build:analyze` - Runs Webpack Bundle Analyzer which outputs htmls files for server bundle and for the browser bundle.

##### CUSTOM
- `yarn preview-export` - Runs a HTTP server (`python3 -m http.server`) in `out/` to preview the static HTML output from `yarn export`.
- `ncu -x postcss,postcss-nested,autoprefixer -u` - Update all dependencies but keep postcss at Version 7.

### Dependency management
- `yarn add <package...>` - Installs the “latest” version of the package.
- `yarn remove <package...>` - Removes the package from your direct dependencies updating your package.json and yarn.lock files in the process.
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) upgrades your package.json dependencies to the latest versions, ignoring specified versions.

### Absolute Imports and Aliases
- https://nextjs.org/blog/next-9-4#absolute-imports-and-aliases
- [`jsconfig`](https://code.visualstudio.com/docs/languages/jsconfig#_jsconfig-options) / [`tsconfig`](https://www.typescriptlang.org/tsconfig#baseUrl)

## Inspiration

- https://imgflip.com/memegenerator
- https://imgur.com/memegen/

## Resources

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
