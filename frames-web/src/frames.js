import defaultProfileUrl from './assets/default-profile.png'

export const frames = {
  en: {
    label:        'English',
    count:        9,
    fbOverlayIds: [ '501048220847197', '501048220847197', '501048220847197', '501048220847197', '501048220847197', '501048220847197', '501048220847197', '501048220847197', '501048220847197' ]
  },
  fr: {
    label:        'Française',
    count:        3,
    fbOverlayIds: [ '501048220847197', '501048220847197', '501048220847197' ]
  }
}

export function getFrameSpecs(language) {
  return [ ...Array(frames[language].count).keys() ].map((_, index) => getFrameSpec(language, index))
}

export function getFrameSpec(language, index) {
  return {
    id:           `${language}-${index}`,
    language:     language,
    index:        index,
    fbOverlayUrl: `https://www.facebook.com/profilepicframes/?selected_overlay_id=${frames[language].fbOverlayIds[index]}`,
    url:          `frames/${language}/${(index + 1).toString().padStart(3, '0')}.png`
  }
}

export function getDefaultProfileSpec() {
  return {
    height: 1280,
    url:    defaultProfileUrl,
    width:  1280
  }
}
