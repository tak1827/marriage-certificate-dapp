const APP_ID = 2593999254169138
const TWEET_TXT = 'I issued a marriage certificate on Blockchain. Check out my certificate'
const ML_SUBJECT = 'I issued a marriage certificate on Blockchain'

const builURL = () => {
  const l = window.location
  const appName = l.pathname.split('/')[1]
  return encodeURIComponent(`${l.origin}/${appName}/?p=/${l.pathname.replace(`/${appName}/`,'')}`)
}

const buildFBLink = () => {
  const appID = APP_ID
  const display = 'popup'
  return `https://www.facebook.com/dialog/share?app_id=${appID}&display=${display}&href=${builURL()}&redirect_uri=${builURL()}`
}

const buildTWLink = () => {
  const text = TWEET_TXT
  const hashtags = 'blockchain,marriage,certificate'
  return `https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${builURL()}`
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
