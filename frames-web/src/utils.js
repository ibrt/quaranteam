import URLSearchParams from '@ungap/url-search-params'
import defaultProfileUrl from './assets/default-profile.png'
import frames from './assets/frames.json'
import frames_legacy from './assets/frames_legacy'

const mergedFrames = Object.assign({}, frames, frames_legacy)

export function getLanguageFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang')
  return lang && mergedFrames[lang] ? lang : 'en'
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
  return Object.entries(mergedFrames)
  .map(([ k, v ]) => ({ code: k, label: v.label }))
  .sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
}

export function getDefaultFrameSpec() {
  const languageCode = getLanguageFromUrl()
  return getFrameSpec(languageCode, mergedFrames[languageCode].frames[0])
}

export function getFrameSpecs(languageCode) {
  return mergedFrames[languageCode].frames.map(f => getFrameSpec(languageCode, f))
}

export function getFrameSpec(languageCode, frame) {
  return {
    id:       `${languageCode}-${frame.type}`,
    language: languageCode,
    url:      frame.legacy ? `frames_legacy/${languageCode}/frame-${frame.type}.png` : `frames/${languageCode}/frame-${frame.type}.2x.png`,
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
