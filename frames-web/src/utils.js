import URLSearchParams from '@ungap/url-search-params'
import defaultProfileUrl from './assets/default-profile.png'
import frames from './assets/frames.json'

export function getLanguageFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')
  return lang && frames[lang] ? lang : 'en'
}

export function setLanguageToUrl(language) {
  const params = new URLSearchParams(window.location.search)
  params.set('lang', language)

  if (window.history.pushState) {
    const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`
    window.history.pushState({ path: url }, '', url)
  } else {
    window.location.search = params.toString()
  }
}

export function getLanguages() {
  return Object.entries(frames)
  .map(([ k, v ]) => ({ code: k, label: v.label }))
  .sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0)
}

export function getDefaultFrameSpec() {
  const languageCode = getLanguageFromUrl()
  return getFrameSpec(languageCode, frames[languageCode].frames[0])
}

export function getFrameSpecs(languageCode) {
  return frames[languageCode].frames.map(f => getFrameSpec(languageCode, f))
}

export function getFrameSpec(languageCode, frame) {
  return {
    id:       `${languageCode}-${frame.type}`,
    language: languageCode,
    url:      `frames/${languageCode}/frame-${frame.type}.png`,
    fbUrl:    frame.fbId ? `https://www.facebook.com/profilepicframes/?selected_overlay_id=${frame.fbId}` : null
  }
}

export function getDefaultProfileSpec() {
  return {
    height: 1280,
    url:    defaultProfileUrl,
    width:  1280
  }
}
