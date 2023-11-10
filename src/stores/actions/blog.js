import { getBlog } from "../../apis/blog";
import { actionType } from "./actiontype";

export const getBlogPR = (bid) => async (dispatch) => {
  try {
    const rs = await getBlog(bid);
    if (rs.data.err === 0) {
      dispatch({
        type: actionType.GETBLOG,
        mes: rs.data.mes,
        blog: rs.data.blog,
      });
    } else {
      dispatch({
        type: actionType.GETBLOG,

        mes: rs.data.mes,
        blog: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GETBLOG,

      blog: null,
    });
  }
};
