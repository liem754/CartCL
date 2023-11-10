import { actionType } from "../actions/actiontype";

const initState = {
  products: null,
  product: null,

  mes: "",
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GETPRODUCTSBD:
      return {
        products: action.products,
        mes: action.mes,
      };
    case actionType.GETPRODUCT:
      return {
        product: action.product,
        mes: action.mes,
      };

    default:
      return state;
  }
};
export default productReducer;
