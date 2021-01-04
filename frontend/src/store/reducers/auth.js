import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  userEmail: '',
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  console.log('authSuccess');
  console.log(action);
  console.log(action.userEmail);
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    userEmail: action.userEmail
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, userEmail: '' });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;