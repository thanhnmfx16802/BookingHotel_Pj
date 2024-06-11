import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone"; //use moment library to format time
import "./transactionList.css";
import status from "../bookingstatus/CheckStatus";

const TransactionList = () => {
  const [error, setError] = useState("");
  const [trans, setTrans] = useState([]);
  const username = useSelector((state) => state.loginUser.username);
  useEffect(() => {
    const getTrans = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/transaction/${username}`
        );

        if (response.status === 404) {
          throw new Error("You haven't created any transaction yet!");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setTrans(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getTrans();
  }, []);

  function backgroundColor(status) {
    if (status === "Booked") {
      return "colorOrange";
    } else if (status === "Checkin") {
      return "colorGreen";
    } else {
      return "colorPurple";
    }
  }

  return (
    <div className="transaction_list">
      <h3>Your Transactions</h3>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {trans.length > 0 && (
        <div className="trans-table">
          <table>
            <thead>
              <tr className="trans-head">
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trans.map((tra, i) => {
                return (
                  <tr key={i} className={i % 2 == 0 ? "rowGrey" : ""}>
                    <td>{i + 1}</td>
                    <td>{tra.hotel.name}</td>
                    <td>
                      {tra.room.map((r, i) => (i === 0 ? r.num : `, ${r.num}`))}
                    </td>
                    <td>
                      {moment(tra.dateStart)
                        .tz("Asia/Bangkok")
                        .format("DD/MM/YYYY")}{" "}
                      -{" "}
                      {moment(tra.dateEnd)
                        .tz("Asia/Bangkok")
                        .format("DD/MM/YYYY")}
                    </td>
                    <td>${tra.price}</td>
                    <td>{tra.payment}</td>
                    <td>
                      <span
                        className={backgroundColor(
                          status(
                            moment(tra.dateStart).tz("Asia/Bangkok"),
                            moment(tra.dateEnd).tz("Asia/Bangkok")
                          )
                        )}
                      >
                        {status(
                          moment(tra.dateStart).tz("Asia/Bangkok"),
                          moment(tra.dateEnd).tz("Asia/Bangkok")
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default TransactionList;
