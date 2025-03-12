/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bafybeibdhjugr2jcj6mrmdghuyaxrk3gwxmldfrszz3avmwhsahgvgfw34.ipfs.w3s.link",
      "ipfs.w3s.link",
      "w3s.link",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.w3s.link",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.nftstorage.link",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
