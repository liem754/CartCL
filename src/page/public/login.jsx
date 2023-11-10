import { useState } from "react";
import { login, register } from "../../apis/user";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { LoginSC } from "../../stores/actions/auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [payload, setPayload] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const handle = async () => {
    if (isLogin) {
      const final = { email: payload?.email, password: payload?.password };

      const rs = await login(final);
      if (rs.data.success) {
        Swal.fire("Chúc Mừng !", rs.data.mes, "success").then(() => {
          dispatch(
            LoginSC({
              token: rs.data.accessToken,
              userData: rs.data.userData,
            })
          );
          navigate("/");
        });
      }
    } else {
      const rss = await register(payload);
      if (rss.data.err === 0) {
        Swal.fire("Chúc Mừng !", rss.data.mes, "success").then(() => {
          setIsLogin(true);
        });
      }
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-4/5">
        <div class="h-auto md:flex w-full justify-center items-center my-10">
          <div class="flex md:w-1/2 justify-center py-10 items-center bg-white border rounded-md">
            <div class="bg-white">
              <h1 class="text-gray-800 font-bold text-2xl mb-1">
                Hello Again!
              </h1>
              <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
              {!isLogin && (
                <>
                  <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <input
                      class="pl-2 outline-none border-none"
                      type="text"
                      name=""
                      id=""
                      placeholder="Full name"
                      value={payload?.name}
                      onChange={(e) =>
                        setPayload((pre) => ({ ...pre, name: e.target.value }))
                      }
                    />
                  </div>
                  <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                    <input
                      class="pl-2 outline-none border-none"
                      type="text"
                      name=""
                      id=""
                      placeholder="Mobile"
                      value={payload?.mobile}
                      onChange={(e) =>
                        setPayload((pre) => ({
                          ...pre,
                          mobile: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Email Address"
                  value={payload?.email}
                  onChange={(e) =>
                    setPayload((pre) => ({ ...pre, email: e.target.value }))
                  }
                />
              </div>
              <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  class="pl-2 outline-none border-none"
                  type="text"
                  name=""
                  id=""
                  placeholder="Password"
                  value={payload?.password}
                  onChange={(e) =>
                    setPayload((pre) => ({ ...pre, password: e.target.value }))
                  }
                />
              </div>
              {isLogin ? (
                <>
                  <button
                    onClick={handle}
                    class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  >
                    Login
                  </button>
                  <span
                    onClick={() => setIsLogin(false)}
                    class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                  >
                    Chưa có tài khoản ?
                  </span>
                </>
              ) : (
                <>
                  <button
                    onClick={handle}
                    class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
                  >
                    Register
                  </button>
                  <span
                    onClick={() => setIsLogin(true)}
                    class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                  >
                    Đăng nhập ngay ?
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
