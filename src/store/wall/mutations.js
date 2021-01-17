import axios from 'axios'

export const update = (state, payload) => {
  state.posts = payload
}

export const authenticated = (state, payload) => {
  state.authenticated = payload
}

export const facebookAuth = (state, payload) => {
  state.facebookAuth = payload
}

export const setAvatar = (state, userId) => {
  var url = 'https://graph.facebook.com/v3.0/' + userId + '/picture'
  axios.get(url, { responseType: 'blob' })
    .then(response => {
      var reader = new FileReader()
      reader.readAsDataURL(response.data)
      reader.onload = function () {
        state.avatar = reader.result
      }
    })
}

export const token = (state, payload) => {
  state.token = payload
}

export const username = (state, payload) => {
  state.username = payload
}

export const clearAuth = (state) => {
  state.facebookAuth = {}
}

export const clearToken = (state) => {
  state.token = ''
}

export const qrCodes = (state, payload) => {
  if (!containsObject(payload.wallId, state.qrCodes)) {
    state.qrCodes.push(payload)
  }
}

export const clearQrCodes = (state) => {
  state.qrCodes = []
}

export const title = (state, payload) => {
  state.title = payload
}

function containsObject (obj, list) {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i].wallId === obj) {
      return true
    }
  }

  return false
}
