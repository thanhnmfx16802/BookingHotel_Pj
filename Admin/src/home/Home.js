import Dashboard from "../ad_pages/dashboard";
import SideBar from "../ad_pages/SideBar";
import Login from "../auth_AD/AD_Login";
import { useSelector } from "react-redux";

const Home = () => {
  const isLogin = useSelector((state) => state.loginAdmin.isLogin);
  return (
    <div>
      {!isLogin ? (
        <Login />
      ) : (
        <div className="d-flex gap-4 justify-content-center">
          <SideBar />
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default Home;
