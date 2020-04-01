import defaultProfileUrl from './assets/default-profile.png'
import frames from './assets/frames'
import { getLanguageFromUrl } from './language'

export function getDefaultFrameSpec() {
  const languageCode = getLanguageFromUrl()
  return getFrameSpec(languageCode, frames[languageCode].frames[0])
}

export function getFrameSpecs(languageCode) {
  return frames[languageCode].frames.map(f => getFrameSpec(languageCode, f))
}

export function getFrameSpec(languageCode, frame) {
  return {
    id: `${languageCode}-${frame.type}`,
    url: `frames/${languageCode}/frame-${frame.type}.2x.png`,
    fbUrl: frame.fbId ? `https://www.facebook.com/profilepicframes/?selected_overlay_id=${frame.fbId}` : null
  }
}

export function getDefaultProfileSpec() {
  return {
    height: 1280,
    url:    defaultProfileUrl,
    width:  1280
  }
}
