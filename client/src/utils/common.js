const APP_ID = 2593999254169138
const TWEET_TXT = 'I issued a marriage certificate on Blockchain. Check out my certificate'
const ML_SUBJECT = 'I issued a marriage certificate on Blockchain'

const buildFBLink = () => {
  const appID = APP_ID
  const display = 'popup'
  const href = encodeURIComponent(window.location.href)
  const redirectUri = encodeURIComponent(window.location.href)
  return `https://www.facebook.com/dialog/share?app_id=${appID}&display=${display}&href=${href}&redirect_uri=${redirectUri}`
}

const buildTWLink = () => {
  const text = TWEET_TXT
  const hashtags = 'blockchain,marriage,certificate'
  const url = encodeURIComponent(window.location.href)
  return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${url}`
}

const buildMLink = () => {
  const subject = encodeURIComponent(ML_SUBJECT)
  const body = encodeURIComponent(`${TWEET_TXT}: ${window.location.href}`)
  return `mailto:?Subject=${subject}&body=${body}`
}

const redirectRoot = (condition) => {
  if (condition) window.location.href = "/"
}

export { redirectRoot, buildFBLink, buildTWLink, buildMLink }
