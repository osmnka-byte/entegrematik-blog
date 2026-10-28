import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Blog içi kategori yapılarına organik geçiş sağlandığı için 
      // pazaryeri/e-fatura dış yönlendirmeleri kaldırıldı.
      // Sadece kurumsal ve genel yönlendirmeler bırakıldı:
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