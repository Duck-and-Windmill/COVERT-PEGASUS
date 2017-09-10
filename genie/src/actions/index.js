export const setToken = token => {
  return {
    type: 'SET_TOKEN',
    token
  }
}

export const setUsername = username => {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export const setPassword = password => {
  return {
    type: 'SET_PASSWORD',
    password
  }
}

export const setMfa = mfa => {
  return {
    type: 'SET_MFA',
    mfa
  }
}

export const setErrorMsg = errorMsg => {
  return {
    type: 'SET_ERROR_MSG',
    errorMsg
  }
}

export const setPositions = positions => {
  return {
    type: 'SET_POSITIONS',
    positions
  }
}

export const toggleShowMfa = bool => {
  return {
    type: 'TOGGLE_SHOW_MFA',
    bool
  }
}