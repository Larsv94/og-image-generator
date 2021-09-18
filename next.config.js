module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
            replaceAttrValues: {
              "#6c63ff": "var(--svg-primary)",
            },
          },
        },
      ],
    });

    return config;
  },
};
