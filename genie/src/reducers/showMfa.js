const showMfa = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_MFA':
      return action.bool
    default:
      return state
  }
}

export default showMfa