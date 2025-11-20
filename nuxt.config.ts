// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: '/oneliner/',
    head: {
      title: 'Oneliner - Free Online HTML, CSS, JavaScript & JSON Minifier | Code Beautifier | Base64 Encoder/Decoder Tool',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'title', content: 'Oneliner - Free Online HTML, CSS, JavaScript & JSON Minifier | Code Beautifier | Base64 Encoder/Decoder Tool' },
        { name: 'description', content: 'Professional online code minifier and beautifier for HTML, CSS, JavaScript & JSON with Base64 encoder/decoder for text and images. Free developer tool with drag-and-drop support, offline PWA capability, dark mode, and real-time statistics. No installation required. Works completely offline.' },
        { name: 'keywords', content: 'HTML minifier, CSS minifier, JavaScript minifier, JSON minifier, base64 encoder, base64 decoder, image to base64, code beautifier, code formatter, online minifier, free minifier, developer tools, code compression, HTML formatter, CSS formatter, JavaScript formatter, JSON formatter, PWA, offline tool, code optimizer' },
        { name: 'author', content: 'Oneliner' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'English' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'theme-color', content: '#2563eb' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://taufiksoleh.github.io/oneliner/' },
        { property: 'og:title', content: 'Oneliner - Free Online HTML, CSS, JavaScript & JSON Minifier | Base64 Encoder/Decoder' },
        { property: 'og:description', content: 'Professional online code minifier and beautifier for HTML, CSS, JavaScript & JSON with Base64 encoder/decoder for text and images. Free developer tool with drag-and-drop support, offline PWA capability, dark mode, and real-time statistics.' },
        { property: 'og:image', content: 'https://taufiksoleh.github.io/oneliner/icon.svg' },
        { property: 'og:image:alt', content: 'Oneliner - Code Minifier and Beautifier Tool' },
        { property: 'og:site_name', content: 'Oneliner' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: 'https://taufiksoleh.github.io/oneliner/' },
        { property: 'twitter:title', content: 'Oneliner - Free Online HTML, CSS, JavaScript & JSON Minifier | Base64 Encoder/Decoder' },
        { property: 'twitter:description', content: 'Professional online code minifier and beautifier for HTML, CSS, JavaScript & JSON with Base64 encoder/decoder for text and images. Free developer tool with drag-and-drop support, offline PWA capability, dark mode, and real-time statistics.' },
        { property: 'twitter:image', content: 'https://taufiksoleh.github.io/oneliner/icon.svg' },
        // PWA
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Oneliner' }
      ],
      link: [
        { rel: 'canonical', href: 'https://taufiksoleh.github.io/oneliner/' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Oneliner',
            alternateName: 'Oneliner Code Minifier',
            url: 'https://taufiksoleh.github.io/oneliner/',
            description: 'Professional online code minifier and beautifier for HTML, CSS, JavaScript & JSON with Base64 encoder/decoder for text and images. Free developer tool with drag-and-drop support, offline PWA capability, dark mode, and real-time statistics.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript. Requires HTML5.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'HTML Minification and Beautification',
              'CSS Minification and Beautification',
              'JavaScript Minification and Beautification',
              'JSON Minification and Beautification',
              'Base64 Encoder and Decoder for Text',
              'Base64 Encoder and Decoder for Images',
              'Drag and Drop File Upload',
              'Offline PWA Support',
              'Dark Mode',
              'Real-time Statistics',
              'Copy to Clipboard',
              'File Download',
              'Keyboard Shortcuts'
            ],
            screenshot: 'https://taufiksoleh.github.io/oneliner/icon.svg',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '1'
            },
            author: {
              '@type': 'Organization',
              name: 'Oneliner'
            }
          })
        },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js', defer: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js', defer: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js', defer: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js', defer: true },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js', defer: true }
      ]
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Oneliner - Code Minifier & Beautifier',
      short_name: 'Oneliner',
      description: 'Professional HTML, CSS, JavaScript & JSON minifier and beautifier for developers',
      theme_color: '#2563eb',
      background_color: '#f8fafc',
      display: 'standalone',
      orientation: 'any',
      start_url: '/oneliner/',
      icons: [
        {
          src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect fill='%232563eb' width='192' height='192' rx='24'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='120' fill='white' font-family='monospace'%3E{;}%3C/text%3E%3C/svg%3E",
          sizes: '192x192',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        },
        {
          src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect fill='%232563eb' width='512' height='512' rx='64'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='320' fill='white' font-family='monospace'%3E{;}%3C/text%3E%3C/svg%3E",
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ],
      categories: ['developer tools', 'utilities', 'productivity']
    },
    workbox: {
      navigateFallback: '/oneliner/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  nitro: {
    preset: 'static',
    output: {
      publicDir: 'dist'
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  compatibilityDate: '2024-01-15'
})
