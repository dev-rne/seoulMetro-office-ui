/** @type {import('next').NextConfig} */

const path = require('path');
const withImages = require('next-images');
const withVideos = require('next-videos')
const withLess = require("next-with-less");

module.exports = withVideos(withImages(
  withLess({
    sassOption:{
      includePaths: [path.join(__dirname, 'styles')],
      reactStrictMode: true,
    },
    lessLoaderOptions: {
    },
    images: {
      disableStaticImages: true
    },
  })
))