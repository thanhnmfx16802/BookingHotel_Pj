import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  faClapperboard,
  faUser,
  faBox,
  faMoneyBillTransfer,
  faHotel,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { loginAdActions } from "../store/login-slice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("loginAdmin", JSON.stringify({}));
    dispatch(loginAdActions.ON_LOGIN(localStorage.getItem("loginAdmin")));
    navigate("/");
  };

  return (
    <div className="w-20 pt-3 pb-3 border-end text-muted">
      <p className="fs-3 text-primary border-bottom pe-3 pb-3">Admin Page</p>
      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">main</p>
        <div
          onClick={() => {
            navigate("/");
          }}
          role="button"
        >
          <FontAwesomeIcon
            icon={faClapperboard}
            className="text-primary me-2"
          />
          <span className="text-muted">Dashboard</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">lists</p>
        <div className="mb-1">
          <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
          <span>Users</span>
        </div>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/hotels");
          }}
          role="button"
        >
          <FontAwesomeIcon icon={faHotel} className="text-primary me-2" />
          <span>Hotels</span>
        </div>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/all-rooms");
          }}
          role="button"
        >
          <FontAwesomeIcon icon={faBox} className="text-primary me-2" />
          <span>Rooms</span>
        </div>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/transaction");
          }}
          role="button"
        >
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            className="text-primary me-2"
          />
          <span>Transactions</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">new</p>
        <div
          className="mb-1"
          onClick={() => {
            navigate("/add-hotels");
          }}
          role="button"
        >
          <FontAwesomeIcon icon={faHotel} className="text-primary me-2" />
          <span>New Hotel</span>
        </div>

        <div
          className="mb-1"
          onClick={() => {
            navigate("/add-rooms");
          }}
          role="button"
        >
          <FontAwesomeIcon icon={faBox} className="text-primary me-2" />
          <span>New Room</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-uppercase text-muted fs-6 mb-0">user</p>
        <div role="button" onClick={logoutHandler}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-primary me-2"
          />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
