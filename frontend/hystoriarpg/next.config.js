const nextConfig = {
  // ...existing code...
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      jquery: 'jquery/src/jquery'
    };
    return config;
  }
  // ...existing code...
};

module.exports = nextConfig;