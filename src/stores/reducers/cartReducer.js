import { actionType } from "../actions/actiontype";

const initState = {
  carts: null,
  mes: "",
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GETCART:
      return {
        carts: action.carts,
        mes: action.mes,
      };

    default:
      return state;
  }
};
export default cartReducer;
