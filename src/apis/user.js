import axios from "./axios";

export const register = (data) =>
  axios({
    url: "/api/v1/user/register",
    method: "post",
    data,
  });
export const login = (data) =>
  axios({
    url: "/api/v1/user/login",
    method: "post",
    data,
  });
export const updateCart = (data) =>
  axios({
    url: "/api/v1/user/update",
    method: "put",
    data,
  });
export const getCart = () =>
  new Promise(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/",
        method: "get",
      });
      resolve(rs);
    } catch (error) {
      reject(error.response);
    }
  });

export const deleteCart = (pid) =>
  axios({
    url: "/api/v1/user/delete/" + pid,
    method: "delete",
  });
