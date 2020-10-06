module.exports = (nextConfig = {}) => {
  return Object.assign(
    {
      env: {
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_PREVIEW_ACCESS_TOKEN:
          process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
        CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
      },
    },
    nextConfig,
    {
      webpack(config, options) {
        const { isServer } = options;
        const assetPrefix = nextConfig.assetPrefix || "";
        const limit = nextConfig.inlineFontLimit || 8192;
        let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;

        config.module.rules.push({
          test: testPattern,
          issuer: {
            // Next.js already handles url() in css/sass/scss files
            test: /\.\w+(?<!(s?c|sa)ss)$/i,
          },
          use: [
            {
              loader: require.resolve("url-loader"),
              options: {
                limit,
                fallback: require.resolve("file-loader"),
                publicPath: `${assetPrefix}/_next/static/chunks/fonts/`,
                outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
                name: "[name]-[hash].[ext]",
              },
            },
          ],
        });

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    }
  );
};
