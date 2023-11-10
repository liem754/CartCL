import axios from "./axios";
export const getProducts = () =>
  axios({
    url: "/api/v1/products/",
    method: "get",
  });
export const getProductsbyid = (pid) =>
  axios({
    url: "/api/v1/products/" + pid,
    method: "get",
  });
