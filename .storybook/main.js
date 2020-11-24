module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
}

const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../stories/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];

    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, "../components"),
      '@/assets': path.resolve(__dirname, "../public/assets"),
      '@/pages': path.resolve(__dirname, "../pages"),
      '@/lib': path.resolve(__dirname, "../lib"),
      '@/styles': path.resolve(__dirname, "../styles"),
    }

    // Return the altered config
    return config
  },
}
