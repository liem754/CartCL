import { actionType } from "../actions/actiontype";

const initState = {
  mes: "",
  blog: null,
};

const BlogReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GETBLOG:
      return {
        mes: action.mes,
        blog: action.blog,
      };

    default:
      return state;
  }
};
export default BlogReducer;
