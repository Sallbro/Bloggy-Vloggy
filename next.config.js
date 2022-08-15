// sass
const path = require('path');
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
