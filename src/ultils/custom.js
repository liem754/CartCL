import { Icons } from "./icon";

const { AiFillStar, AiOutlineStar } = Icons;
export const formatCurrencyVND = (price) => {
  // Chuyển đổi giá tiền thành số và làm tròn đến 2 chữ số thập phân
  const roundedPrice = Math.round(parseFloat(price) * 100) / 100;

  // Sử dụng hàm toLocaleString() để định dạng số sang chuỗi có dấu phân cách hàng nghìn
  const formattedPrice = roundedPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Trả về giá tiền đã được định dạng
  return formattedPrice;
};
export const formatStar = (number) => {
  const stars = [];
  number = Math.round(number);
  for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="#f1b400" />);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="#f1b400" />);
  return stars;
};
