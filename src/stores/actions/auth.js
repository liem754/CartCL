import { actionType } from "./actiontype";
export const LoginSC = ({ token, userData }) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    isLoggedIn: true,
    userData,
    token,
  };
};
export const logout = () => {
  return {
    type: actionType.LOGOUT,
    isLoggedIn: false,
    token: null,
  };
};
