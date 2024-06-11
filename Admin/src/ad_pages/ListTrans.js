import "./dashBoard.css";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Card from "./Card";
import Paginator from "../components/Pagination";
import moment from "moment-timezone";
import status from "../bookingstatus/CheckStatus";

function TransactionList() {
  const [error, setError] = useState("");

  const [orderCount, setOrderCount] = useState("");

  const [currentTrans, setCurrentTrans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTrans = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/trans");

        if (response.status === 404) {
          throw new Error("No transaction available");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setCurrentTrans(data.transactions);
        setOrderCount(data.numberOfOrder);
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
        "http://localhost:5000/admin/trans?page=" + pageNum
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
    <div className="p-3">
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {currentTrans.length > 0 && (
        <div className="d-flex gap-4 justify-content-center">
          <SideBar />
          <Card className="card_trans">
            <h1 className="fs-5 text-muted">Transactions List</h1>

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
              lastPage={Math.ceil(orderCount / 9)}
            >
              {`${page} / ${Math.ceil(orderCount / 9)}`}
            </Paginator>
          </Card>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
