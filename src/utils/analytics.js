const PRODUCTION_HOSTNAME = 'miyagiyoshihito12345.github.io'

let hasTrackedCalculatorUse = false

function canTrack() {
  return (
    typeof window !== 'undefined' &&
    window.location.hostname === PRODUCTION_HOSTNAME &&
    typeof window.gtag === 'function'
  )
}

export function trackEvent(eventName, parameters = {}) {
  if (!canTrack()) return false

  window.gtag('event', eventName, parameters)
  return true
}

export function trackCalculatorInteraction(eventName, parameters = {}) {
  if (!hasTrackedCalculatorUse) {
    hasTrackedCalculatorUse = trackEvent('calculator_used')
  }

  trackEvent(eventName, parameters)
}
