import "./dashBoard.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import Paginator from "../components/Pagination";
import moment from "moment-timezone";
import status from "../bookingstatus/CheckStatus";

function Dashboard() {
  const [error, setError] = useState("");
  const [userCount, setUserCount] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [earning, setEarning] = useState(0);
  const [currentTrans, setCurrentTrans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const countUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/current-users"
        );

        if (response.status !== 200 && response.status !== 404) {
          throw new Error("Cannot check user data due to server error!");
        }
        const data = await response.json();

        setUserCount(data.count);
      } catch (err) {
        setError(err.message);
      }
    };
    countUsers();
  }, []);

  useEffect(() => {
    const getTrans = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/current-trans"
        );

        if (response.status === 404) {
          throw new Error("No transaction available");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setCurrentTrans(data.transactions);
        setOrderCount(data.numberOfOrder);

        const priceArr = data.transactions.map((item) => item.price);

        const totalPrice = priceArr.reduce((a, b) => a + b, 0);
        setEarning(totalPrice);
      } catch (err) {
        setError(err.message);
      }
    };
    getTrans();
  }, []);

  const loadTrans = async (direction) => {
    let pageNum = page;
    if (direction === "next") {
      pageNum++;
      setPage(pageNum);
    }
    if (direction === "previous") {
      pageNum--;
      setPage(pageNum);
    }
    try {
      const response = await fetch(
        "http://localhost:5000/admin/current-trans?page=" + pageNum
      );
      if (response.status === 404) {
        throw new Error("No transaction available");
      }
      if (response.status !== 200) {
        throw new Error("Something went wrong with server!");
      }
      const data = await response.json();

      setCurrentTrans(data.transactions);
    } catch (err) {
      setError(err.message);
    }
  };

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
    <div className="w-auto p-3">
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {currentTrans.length > 0 && (
        <div className="content">
          <div className="card-row">
            <Card className="card_title bg-primary d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Users</span>
              <span className="fs-4">{userCount}</span>
            </Card>
            <Card className="card_title bg-info d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Orders</span>
              <span className="fs-4">{orderCount}</span>
            </Card>
            <Card className="card_title bg-warning d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Earning</span>
              <span className="fs-4">${earning}</span>
            </Card>
            <Card className="card_title bg-danger d-flex flex-column ps-3 pt-2">
              <span className="text-white text-uppercase">Balance</span>
              <span className="fs-4">${earning}</span>
            </Card>
          </div>
          <div className="mt-5">
            <Card className="card_trans">
              <h1 className="fs-5">Lastest Transactions</h1>

              <table className="trans-table">
                <thead>
                  <tr className="trans-head">
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>ID</th>
                    <th>User</th>
                    <th>Hotel</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTrans.map((trans, i) => {
                    return (
                      <tr key={i}>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <td>{trans._id}</td>
                        <td>{trans.user}</td>
                        <td>{trans.hotel.name}</td>
                        <td>
                          {trans.room.map((r, i) =>
                            i === 0 ? r.num : `, ${r.num}`
                          )}
                        </td>
                        <td>
                          {moment(trans.dateStart).format("DD/MM/YYYY")} -{" "}
                          {moment(trans.dateEnd).format("DD/MM/YYYY")}
                        </td>
                        <td>${trans.price}</td>
                        <td>{trans.payment}</td>
                        <td>
                          <span
                            className={backgroundColor(
                              status(
                                moment(trans.dateStart).tz("Asia/Bangkok"),
                                moment(trans.dateEnd).tz("Asia/Bangkok")
                              )
                            )}
                          >
                            {status(
                              moment(trans.dateStart).tz("Asia/Bangkok"),
                              moment(trans.dateEnd).tz("Asia/Bangkok")
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Paginator
                onPrevious={() => loadTrans("previous")}
                onNext={() => loadTrans("next")}
                currentPage={page}
                lastPage={Math.ceil(orderCount / 8)}
              >
                {`${page} / ${Math.ceil(orderCount / 8)}`}
              </Paginator>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
