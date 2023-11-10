import { Outlet } from "react-router-dom";
import { Header } from "../../components";

function Public() {
  return (
    <div className="">
      <Header />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Public;
