const positions = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSITIONS':
      return action.positions
    default:
      return state
  }
}

export default positions