const errorMsg = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR_MSG':
      return action.errorMsg
    default:
      return state
  }
}

export default errorMsg