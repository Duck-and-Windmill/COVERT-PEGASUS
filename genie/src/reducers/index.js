import { combineReducers } from 'redux';
import token from './token'
import username from './username'
import password from './password'
import mfa from './mfa'
import showMfa from './showMfa'
import errorMsg from './errorMsg'
import positions from './positions'

const genieApp = combineReducers({
  token,
  username,
  password,
  mfa,
  showMfa,
  errorMsg,
  positions
});

export default genieApp;