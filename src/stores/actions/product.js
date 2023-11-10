import { getProducts } from "../../apis/product";
import { actionType } from "./actiontype";

export const getProductsRD = () => async (dispatch) => {
  try {
    const rs = await getProducts();
    if (rs.data.success) {
      dispatch({
        type: actionType.GETPRODUCTSBD,
        products: rs.data.products,
        mes: rs.data.mes,
      });
    } else {
      dispatch({
        type: actionType.GETPRODUCTSBD,
        products: null,
        mes: rs.data.mes,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GETPRODUCTSBD,
      products: null,
    });
  }
};
// export const getProductOne = (param) => async (dispatch) => {
//   try {
//     const rs = await getProduct(param);
//     if (rs.data.err === 0) {
//       dispatch({
//         type: actionType.GETPRODUCT,
//         product: rs.data.product,
//         mes: rs.data.mes,
//       });
//     } else {
//       dispatch({
//         type: actionType.GETPRODUCT,
//         product: null,
//         mes: rs.data.mes,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionType.GETPRODUCT,
//       product: null,
//     });
//   }
// };
