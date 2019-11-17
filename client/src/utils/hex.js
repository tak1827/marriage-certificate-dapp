// Ref: https://gist.github.com/valentinkostadinov/5875467
const toHex = (str) => {
    // utf8 to latin1
    var s = unescape(encodeURIComponent(str))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
}

const fromHex = (h) => {
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
}

export { toHex, fromHex }
