const mfa = (state = '', action) => {
  switch (action.type) {
    case 'SET_MFA':
      return action.mfa
    default:
      return state
  }
}

export default mfa