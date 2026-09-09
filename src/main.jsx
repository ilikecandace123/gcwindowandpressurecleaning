import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { captureAdsAttribution } from './lib/adsAttribution.js'

// Capture Google Ads click IDs / UTM tags from the landing URL before the
// app renders, so they are available to every lead form for 90 days.
captureAdsAttribution()

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
