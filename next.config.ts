import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Cloudflare Pages statik export için zorunludur
  trailingSlash: true, // Statik sayfa yönlendirmelerinde klasör yapısını korur
  reactStrictMode: true,
  poweredByHeader: false,

  // Turbopack kök dizin tanımı
  turbopack: {
    root: '.',
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    unoptimized: true, // Statik export (output: 'export') olduğu için Next.js görsel optimizasyonu devre dışı bırakılır
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      { source: "/fiyatlar", destination: "/#fiyatlandirma", permanent: true },
      { source: "/fiyatlandirma-ve-paketler", destination: "/#fiyatlandirma", permanent: true },
      { source: "/paketler", destination: "/#fiyatlandirma", permanent: true },
      { source: "/ozellikler", destination: "/#ozellikler", permanent: true },
      { source: "/iletisim", destination: "/#sss", permanent: true },
      { source: "/hakkimizda", destination: "/", permanent: true },
      { source: "/kurumsal", destination: "/", permanent: true },
      { source: "/hizmetler/:path*", destination: "/#ozellikler", permanent: true },
      { source: "/entegrasyonlar/:path*", destination: "/#entegrasyonlar", permanent: true },
    ];
  },
};

export default nextConfig;