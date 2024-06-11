import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import useInput from "../hooks/useInput";
import status from "../bookingstatus/CheckStatus";

import "./BookingHotel.css";

const BookHotel = (props) => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.loginUser.username);

  const useremail = useSelector((state) => state.loginUser.email);
  const [room, setRoom] = useState([]);
  const [error, setError] = useState(null);
  const [canReserve, setCanReserve] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [payment, setPayment] = useState("");

  const {
    data: name,
    setData: setName,
    error: nameError,
  } = useInput((input) => input === username);

  const {
    data: email,
    setData: setEmail,
    error: emailError,
  } = useInput((input) => input === useremail);

  const {
    data: phone,
    setData: setPhone,
    error: phoneError,
  } = useInput((input) => !isNaN(input) && input.length > 3);

  const {
    data: idNum,
    setData: setIdNum,
    error: idNumError,
  } = useInput((input) => !isNaN(input) && input.length > 3);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/room/${props.idHotel}`
        );

        if (response.status === 404) {
          throw new Error("No room found due to hotel is unavailable");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setRoom([]);
      }
    };
    getRoom();
  }, []);

  const handleCheckBoxChange = (event) => {
    // when have event onchange, initialize a value obj
    const value = {
      id: event.target.id,
      num: event.target.name,
      price: event.target.value,
    };

    // if box checked => add to selectedRoom arr
    if (event.target.checked) {
      setSelectedRooms((selectedRoom) => [...selectedRoom, value]);
    } else {
      // if uncheck => remove from selectedRoom arr
      setSelectedRooms((selectedRoom) =>
        selectedRoom.filter((val) => val.num !== value.num)
      );
    }
  };

  // calculate price by only room
  const onlyRoomPrice = selectedRooms.reduce((a, b) => a + +b.price, 0);

  // calculate number of days
  const numberOfDay =
    (date[0].endDate - date[0].startDate) / (24 * 60 * 60 * 1000) + 1;

  const totalPrice = numberOfDay * onlyRoomPrice;

  // function to setup disabled for reserve button
  const isFormInvalid = () => {
    return (
      nameError ||
      emailError ||
      phoneError ||
      idNumError ||
      totalPrice <= 0 ||
      payment === ""
    );
  };

  const handleReserve = async () => {
    const Bookeddata = {
      userInfo: username,
      hotel: props.idHotel,
      room: selectedRooms,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      price: totalPrice,
      payment: payment,
      // status: status(date[0].startDate, date[0].endDate),
    };
    console.log(Bookeddata);

    try {
      const response = await fetch(
        `http://localhost:5000/transaction/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          mode: "cors",

          body: JSON.stringify(Bookeddata),
        }
      );

      if (response.status === 401) {
        throw new Error(
          "This time your room is already booked! Please chose another time!"
        );
      }

      if (response.status !== 200) {
        throw new Error("Something went wrong with server!");
      }

      navigate(`/transaction/${username}`);
    } catch (err) {
      setCanReserve(err.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {room.length > 0 && (
        <div>
          <div className="bookingContainer">
            <div>
              <h3>Dates</h3>
              <DateRange
                editableDateInputs={true} // true là có thể sửa date ở calenda input
                onChange={(item) => {
                  setDate([item.selection]);
                  console.log([item.selection]);
                }}
                moveRangeOnFirstSelection={false} // chọn số ngày dựa theo lần đầu, false là tắt
                ranges={date}
                className="book_hotel" // để tạo css ví dụ đặt pos: absolute
                minDate={new Date()}
                months={1} // Hiện 1 tháng
                direction="horizontal" //  tháng hiện theo phương ngang
              />
            </div>
            <div className="bookingWrapper">
              <h3>Reserve Info</h3>
              <div className="bookingInputContainer">
                <label htmlFor="fullname">Your Full Name: </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && (
                  <p className="error_booking">
                    Please enter your correct name!
                  </p>
                )}
              </div>
              <div className="bookingInputContainer">
                <label htmlFor="fullname">Your Email: </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="error_booking">
                    Please enter your correct email!
                  </p>
                )}
              </div>
              <div className="bookingInputContainer">
                <label htmlFor="fullname">Your Phone Number: </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError && (
                  <p className="error_booking">
                    Phone number is number format and more than 3 char!
                  </p>
                )}
              </div>
              <div className="bookingInputContainer">
                <label htmlFor="fullname">Your Identity Card Number: </label>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={idNum}
                  onChange={(e) => setIdNum(e.target.value)}
                />
                {idNumError && (
                  <p className="error_booking">
                    ID Card must be number and more than 3 char!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3>Select Rooms</h3>
            <div className="bookingInfoWrap">
              {room.length > 0 ? (
                room.map((r, i) => {
                  if (new Date(r.updatedAt) <= date[0].startDate)
                    return (
                      <div className="bookingContent" key={i}>
                        <div className="bookingDetails">
                          <h4>{r.title}</h4>
                          <p>{r.desc}</p>
                          <p>
                            Max People:{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {r.maxPeople}
                            </span>
                          </p>
                          <p style={{ fontWeight: "bold" }}>${r.price}</p>
                        </div>
                        <div className="bookingCheckBox">
                          {r.roomNumbers.length > 0
                            ? r.roomNumbers.map((num, i) => (
                                <div className="checkbox-container" key={i}>
                                  <p>{num}</p>
                                  <input
                                    type="checkbox"
                                    id={r._id}
                                    value={r.price}
                                    name={num}
                                    onChange={handleCheckBoxChange}
                                  />
                                </div>
                              ))
                            : ""}
                        </div>
                      </div>
                    );
                  else return <div key={i}></div>;
                })
              ) : (
                <div className="bookingWrapper">
                  <p>No room available !</p>
                </div>
              )}
            </div>
          </div>

          <div className="bookingBillWrap">
            <h3>
              Total Bill:{" "}
              <span style={{ color: "red", fontStyle: "italic" }}>
                ${totalPrice}
              </span>
            </h3>

            <div className="bookingBill">
              <select
                className="custom"
                defaultValue=""
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="" hidden>
                  Select Payment Method
                </option>
                <option value="Credit Card">Credit Card</option>
                <option value="Visa">Visa</option>
                <option value="Cash">Cash</option>
                <option value="MoMo">MoMo</option>
                <option value="ZaloPay">ZaloPay</option>
              </select>
              <button
                className={`bill_but ${isFormInvalid() ? "disabled" : ""} `}
                onClick={handleReserve}
                disabled={isFormInvalid()}
              >
                Reserve Now
              </button>
            </div>
            {canReserve && (
              <p style={{ color: "red", textAlign: "center" }}>{canReserve}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BookHotel;
