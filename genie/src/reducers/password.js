const password = (state = '', action) => {
  switch (action.type) {
    case 'SET_PASSWORD':
      return action.password
    default:
      return state
  }
}

export default password