import URLSearchParams from '@ungap/url-search-params'
import { frames } from './frames'

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
