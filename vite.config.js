import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// n8n booking webhooks. In production /api/booking-* are Cloudflare Pages
// Functions; locally Vite proxies them straight to n8n (server side, no CORS).
const N8N_BASE = 'https://skagen.app.n8n.cloud'

// Dev-only middleware that mirrors functions/api/address-autocomplete.js so the
// Google address dropdown works under `npm run dev`. The key is used server-side
// (in this Node dev server), never shipped to the browser.
function devAddressAutocomplete(apiKey) {
  return {
    name: 'dev-address-autocomplete',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/address-autocomplete')) return next()
        const send = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }
        try {
          const u = new URL(req.url, 'http://localhost')
          const q = (u.searchParams.get('q') || '').trim()
          if (q.length < 3) return send({ suggestions: [] })
          if (!apiKey) {
            console.warn('[address-autocomplete] No GOOGLE_PLACES_API_KEY / VITE_GOOGLE_PLACES_API_KEY in .env.local')
            return send({ suggestions: [], error: 'no_local_key' })
          }
          const r = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': 'suggestions.placePrediction.text,suggestions.placePrediction.placeId',
            },
            body: JSON.stringify({ input: q, includedRegionCodes: ['au'] }),
          })
          const data = await r.json()
          if (data && data.error) {
            console.warn('[address-autocomplete] Google error:', data.error.status, '-', data.error.message)
            return send({ suggestions: [], error: data.error.message, status: data.error.status })
          }
          const suggestions = (data.suggestions || [])
            .map((s) => ({
              text: (s.placePrediction && s.placePrediction.text && s.placePrediction.text.text) || '',
              placeId: (s.placePrediction && s.placePrediction.placeId) || '',
            }))
            .filter((s) => s.text)
          send({ suggestions })
        } catch (e) {
          console.warn('[address-autocomplete] fetch failed:', String(e))
          send({ suggestions: [], error: String(e) })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const placesKey = env.GOOGLE_PLACES_API_KEY || env.VITE_GOOGLE_PLACES_API_KEY || ''
  return {
    plugins: [react(), devAddressAutocomplete(placesKey)],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      proxy: {
        '/api/booking-questions': {
          target: N8N_BASE,
          changeOrigin: true,
          secure: true,
          rewrite: () => '/webhook/gc-booking-questions',
        },
        '/api/booking-submit': {
          target: N8N_BASE,
          changeOrigin: true,
          secure: true,
          rewrite: () => '/webhook/gc-booking-submit',
        },
        '/api/booking-photos': {
          target: N8N_BASE,
          changeOrigin: true,
          secure: true,
          rewrite: () => '/webhook/gc-attach-photos',
        },
      },
    },
  }
})
