import { actionType } from "../actions/actiontype";

const initState = {
  userData: null,
  mes: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GETONE:
      return {
        userData: action.userData,
        mes: action.mes,
      };
    default:
      return state;
  }
};

export default userReducer;
