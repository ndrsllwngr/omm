// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = (phase, { defaultConfig }) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     /* development only config options here */
  //   }
  // }
  let customConfig = {
    ...defaultConfig,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    prefixIds: {
                      prefixIds: false,
                      prefixClassNames: false,
                    },
                  },
                ],
              },
            },
          },
        ],
      })
      config.module.rules.push({
        test: /\.mp3$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: [
          {
            loader: 'file-loader',
          },
        ],
      })
      return config
    },
    images: {
      domains: ['i.imgflip.com'],
    },
  }
  return withBundleAnalyzer(customConfig)
}
