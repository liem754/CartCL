import { actionType } from "../actions/actiontype";

const initState = {
  isLoggedIn: false,
  token: null,
  userData: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return {
        isLoggedIn: action.isLoggedIn,
        token: action.token,
        userData: action.userData,
      };
    case actionType.LOGOUT:
      return {
        isLoggedIn: action.isLoggedIn,
        token: action.token,
      };
    default:
      return state;
  }
};

export default authReducer;
