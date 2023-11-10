import { Link } from "react-router-dom";
import nike from "../assets/nike.png";
import { logout } from "../stores/actions/auth";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center py-2 bg-gray-200 border-b">
      <div className="w-4/5 flex justify-between">
        <img src={nike} className="w-[60px]" alt="" />
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={userData?.avatar}
                alt=""
                className="w-[40px] rounded-[50%]"
              />
              <h2>{userData?.name}</h2>
            </div>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className=" py-1 px-3 rounded-md bg-blue-600 text-white"
            >
              LogOut
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to={"/login"}
              className=" py-1 px-3 rounded-md bg-blue-600 text-white"
            >
              Login
            </Link>
            <button className=" py-1 px-3 rounded-md bg-blue-600 text-white">
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
