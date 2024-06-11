import React from "react";
import classes from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";

import { faTaxi } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/login-slice";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginUser.isLogin);
  const email = useSelector((state) => state.loginUser.email);
  const username = useSelector((state) => state.loginUser.username);

  const navData = [
    {
      type: "Stays",
      icon: faBed,
      active: true,
    },
    {
      type: "Flights",
      icon: faPlane,
      active: false,
    },
    {
      type: "Car rentals",
      icon: faCar,
      active: false,
    },
    {
      type: "Attractions",
      icon: faBed,
      active: false,
    },
    {
      type: "Airport taxis",
      icon: faTaxi,
      active: false,
    },
  ];

  const logoutHandler = () => {
    localStorage.setItem("loginUser", JSON.stringify({}));
    dispatch(loginActions.ON_LOGIN(localStorage.getItem("loginUser")));
    navigate("/login");
  };

  return (
    <div className={classes.navBar_wrap}>
      <nav className={classes.navBar}>
        <div className={classes.nav}>
          <h3 onClick={() => navigate("/")}>Booking Website</h3>

          <div className={classes.nav_button}>
            <span>{isLogin && email}</span>
            {!isLogin ? (
              <NavLink to="/signup">
                <button className={classes.navbarButton}>Sign Up</button>
              </NavLink>
            ) : (
              <NavLink to={`/transaction/${username}`}>
                <button className={classes.navbarButton}>Transactions</button>
              </NavLink>
            )}
            {!isLogin ? (
              <NavLink to="/login">
                <button className={classes.navbarButton}>Login</button>
              </NavLink>
            ) : (
              <button onClick={logoutHandler} className={classes.navbarButton}>
                Logout
              </button>
            )}
          </div>
        </div>

        <ul>
          {navData.map((data) => (
            <NavItem
              key={data.type}
              service={data.type}
              icon={data.icon}
              active={data.active}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className={props.active ? classes.circle_border : ""}>
      <span>
        <FontAwesomeIcon icon={props.icon} />
      </span>
      {props.service}
    </li>
  );
};
