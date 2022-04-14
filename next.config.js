/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
const withAntdLess = require("next-plugin-antd-less");
const path = require('path');
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images');

const nextConfig = {
  // 원하는 Next 설정 추가
};

module.exports = withPlugins([
  [withImages, {
    webpack(config, options) {
      return config
    }
  }],
  [withAntdLess, {
    sassOption:{
      includePaths: [path.join(__dirname, 'styles')],
      reactStrictMode: true,
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    images: {
      disableStaticImages: true
    }
  }
]
],)