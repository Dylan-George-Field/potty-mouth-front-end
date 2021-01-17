export const update = (state, payload) => {
  state.commit('update', payload)
}

export const login = (state, payload) => {
  state.commit('authenticated', true)
  state.commit('facebookAuth', payload)
  state.commit('setAvatar', payload.authResponse.userID)
}

export const logout = (state, payload) => {
  state.commit('authenticated', false)
  state.commit('clearAuth')
}

export const username = (state, payload) => {
  state.commit('username', payload)
}

export const token = (state, payload) => {
  state.commit('token', payload)
}

export const clearToken = (state) => {
  state.commit('clearToken', token)
}

export const qrCodes = (state, payload) => {
  state.commit('qrCodes', payload)
}

export const clearQrCodes = (state) => {
  state.commit('clearQrCodes')
}

export const title = (state, payload) => {
  state.commit('title', payload)
}
