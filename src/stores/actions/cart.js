import { getCarts } from "../../apis/cart";
import { actionType } from "./actiontype";

export const getCartALL = () => async (dispatch) => {
  try {
    const rs = await getCarts();
    if (rs.data.err === 0) {
      dispatch({
        type: actionType.GETCART,
        carts: rs.data.data,
        mes: rs.data.mes,
      });
    } else {
      dispatch({
        type: actionType.GETCART,
        carts: null,
        mes: rs.data.mes,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GETCART,
      carts: null,
    });
  }
};
