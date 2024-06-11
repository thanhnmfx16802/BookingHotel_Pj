import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  const isLogin = useSelector((state) => state.loginUser.isLogin);
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    navigate("/search", {
      state: { destination: destination, date: date, options: options },
    });
  };

  return (
    <div className="headers">
      <div className="header_items">
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock instant saving of 10% or more
          with a free account
        </p>
        {!isLogin && (
          <button onClick={() => navigate("/login")}>Sign in / Register</button>
        )}
      </div>

      <div className="headers__wrap">
        <div className="form-group">
          <FontAwesomeIcon icon={faBed} className="headerIcon" />
          <select
            className="header__select"
            onChange={(e) => setDestination(e.target.value)}
            onClick={() => {
              setOpenDate(false);
              setOpenOptions(false);
            }}
          >
            <option value="">Where are you going?</option>
            <option value="Ho Chi Minh">Hồ Chí Minh</option>
            <option value="Da Nang">Đà Nẵng</option>
            <option value="Ha Noi">Hà Nội</option>
          </select>
        </div>

        <div className="form-group headerDateItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span
            className="headerShow"
            onClick={() => {
              setOpenDate(!openDate);
              setOpenOptions(false);
            }}
          >
            {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </span>
          {openDate && (
            <DateRange
              editableDateInputs={true} // true là có thể sửa date ở calenda input
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false} // chọn số ngày dựa theo lần đầu, false là tắt
              ranges={date}
              className="date" // để tạo css ví dụ đặt pos: absolute
              minDate={new Date()}
              months={2} // Hiện 2 tháng
              direction="horizontal" // 2 tháng hiện theo phương ngang
            />
          )}
        </div>

        <div className="form-group">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span
            onClick={() => {
              setOpenOptions(!openOptions);
              setOpenDate(false);
            }}
            className="headerSearchText"
          >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
          {openOptions && (
            // option list
            <div className="options">
              {/* option item */}
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* option item */}
              {/* option item */}
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* option item */}
              {/* option item */}
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* option item */}
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};
