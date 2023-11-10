import "./home.css";
import nike from "../../assets/nike.png";
import trash from "../../assets/trash.png";
import check from "../../assets/check.png";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsRD } from "../../stores/actions/product";
import { deleteCart, getCart, updateCart } from "../../apis/user";
import Swal from "sweetalert2";
import { getProductsbyid } from "../../apis/product";
import { logout } from "../../stores/actions/auth";
function Home() {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState(null);
  const [number, setNumber] = useState(1);
  const [lai, setLai] = useState(false);
  const [dele, setDele] = useState(false);
  const [upda, setUpda] = useState(false);
  const [load, setLoad] = useState(false);

  const { products } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const fetch = async () => {
    try {
      const rs = await getCart();
      if (rs.data.err === 0) {
        setCarts(rs.data.carts);
        setLai(false);
        setDele(false);
        setUpda(false);
      }
    } catch (error) {
      if (error.mes === "Token không hợp lệ !") {
        Swal.fire("Thông báo !", "Phiên đăng nhập hết hạn !", "info").then(
          () => {
            dispatch(logout());
          }
        );
      }
    }
  };
  useEffect(() => {
    dispatch(getProductsRD());
  }, [dele]);
  useEffect(() => {
    const time = setTimeout(() => {
      isLoggedIn && fetch();
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [lai, dele, upda]);
  const handle = async (pid, title, image, price, color) => {
    console.log({ pid, title, image, price });
    const rs = await updateCart({
      pid: pid,
      title,
      thumb: image,
      quantity: 1,
      price,
      color,
    });
    if (rs.data.err === 0) {
      Swal.fire("Chúc mừng !", rs.data.mes, "success").then(() => {
        setUpda(true);
      });
    }
  };
  console.log();
  const handleadd = useCallback(
    async (pid, price, quantity, thumb, title) => {
      setLoad(true);
      const rss = await getProductsbyid(pid);
      if (rss.data.err === 0) {
        setNumber((pre) => pre + 1);
        let sl = quantity + 1;
        const rs = await updateCart({
          pid: pid,
          price: rss?.data?.product?.price * sl,
          quantity: sl,
          thumb,
          title,
        });
        if (rs.data.err === 0) {
          setLai(true);
          setLoad(false);
        }
      }
    },
    [number]
  );
  const handlepre = useCallback(
    async (pid, price, quantity, thumb, title) => {
      setLoad(true);
      const rss = await getProductsbyid(pid);
      if (rss.data.err === 0) {
        setNumber((pre) => pre - 1);
        if (quantity > 1) {
          let sl = quantity - 1;
          const rs = await updateCart({
            pid: pid,
            price: rss?.data?.product?.price * sl,
            quantity: sl,
            thumb,
            title,
          });
          if (rs.data.err === 0) {
            setLai(true);
            setLoad(false);
          }
        }
      }
    },
    [number]
  );
  const handleDelete = async (pid) => {
    const rs = await deleteCart(pid);
    if (rs.data.success) {
      Swal.fire("Chúc mừng !", "Đã xóa khỏi cart !", "success").then(() => {
        setDele(true);
      });
    }
  };
  return (
    <div className="home flex justify-center items-center h-screen gap-10  ">
      <div className=" flex product z-10 justify-center items-center">
        <div className=" w-[350px]  rounded-lg p-4  shadow-xl">
          <div className="product1 rounded-lg"></div>
          <div className="  ">
            <img src={nike} alt="" className="w-[40px] z-10 " />
            <h2 className="z-10 ">Our products</h2>
            <div className="bar overflow-y-auto w-full h-[450px] z-10 flex flex-col gap-12 p-2">
              {products?.map((item) => (
                <div className=" flex flex-col gap-3">
                  <img
                    src={item?.image}
                    alt=""
                    // className="bg-[#F2F5F4]"
                    className={`${item?.color ? `bg-[${item?.color}]` : ""}`}
                  />
                  <h2 className="text-lg font-medium">{item?.title}</h2>
                  <h2 className=" text-justify w-ful">
                    {item?.description[0]}
                  </h2>
                  <div className="flex justify-between items-center">
                    <h2 className=" font-medium">{`$ ${item?.price}`}</h2>
                    {carts?.cart.some((el) => el.title === item?.title) ? (
                      <button className="bg-yellow-400 py-1 px-2 rounded-md">
                        <img src={check} alt="" className="w-[20px]" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handle(
                            item?._id,
                            item?.title,
                            item?.image,
                            item?.price,
                            item?.color
                          )
                        }
                        className="bg-yellow-400 py-1 px-2 rounded-md"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <div className=" flex product z-10 justify-center items-center">
          <div className=" w-[350px]  rounded-lg p-4  shadow-xl">
            <div className="product1 rounded-lg"></div>
            <div className="  ">
              <img src={nike} alt="" className="w-[40px] z-10 " />
              <div className="flex justify-between">
                <h2 className="z-10 ">My cart</h2>
                <h2 className="z-10 ">
                  {carts?.cart?.length > 0
                    ? `$ ${carts?.cart
                        ?.reduce((sum, el) => sum + el.price, 0)
                        .toFixed(1)}`
                    : ""}
                </h2>
              </div>
              <div className="bar overflow-auto w-full h-[450px] z-10 flex flex-col gap-12 p-2">
                {carts?.cart.length !== 0 ? (
                  carts?.cart?.map((item, index) => (
                    <div key={index} className=" flex gap-3 ">
                      <div className="w-[30%] relative">
                        <div
                          className={` w-[70px] h-[70px] absolute top-5 left-2 bottom-5 right-4 rounded-[50%] bg-[${item?.color}] `}
                        ></div>
                        <img
                          src={item?.thumb}
                          alt=""
                          className={` -rotate-[30deg] `}
                        />
                      </div>
                      <div className="w-[68%] flex flex-col gap-2">
                        <h2 className="text-md font-medium">{item?.title}</h2>

                        <h2 className=" font-medium">{`$ ${item?.price.toFixed(
                          1
                        )}`}</h2>
                        <div className="flex justify-between items-center">
                          {load ? (
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handlepre(
                                    item?.product,
                                    item?.price,
                                    item?.quantity,
                                    item?.thumb,
                                    item?.title
                                  )
                                }
                                className="w-[30px] flex justify-center items-center h-[30px] text-lg text-center rounded-[50%] bg-gray-200"
                              >
                                <span className="mb-[2px]">-</span>
                              </button>
                              <h2>{item?.quantity}</h2>
                              <button
                                onClick={() =>
                                  handleadd(
                                    item?.product,
                                    item?.price,
                                    item?.quantity,
                                    item?.thumb,
                                    item?.title
                                  )
                                }
                                className="w-[30px] flex justify-center items-center h-[30px] text-lg text-center rounded-[50%] bg-gray-200"
                              >
                                <span className="mb-[2px]">+</span>
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => handleDelete(item?.product)}
                            className="bg-yellow-400 py-1 px-2 rounded-md"
                          >
                            <img src={trash} className="w-[20px]" alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-center">Giỏ hàng trống</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
