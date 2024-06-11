import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";

const Rooms = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/rooms");

        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setRooms(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getRooms();
  }, [success]);

  const handleDeleteRoom = async (id) => {
    alert("Do you want to delete this room?");
    try {
      const response = await fetch(
        "http://localhost:5000/admin/delete-rooms/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          mode: "cors",
        }
      );
      if (response.status === 403) {
        throw new Error(
          "Cannot delete this room because this room exist in other transaction"
        );
      }
      if (response.status !== 200) {
        throw new Error("Internal server error!");
      }
      setNotice(null);

      const data = await response.json();
      setSuccess(data.message);
    } catch (err) {
      setNotice(err.message);
    }
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <SideBar />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!error && (
        <div className="mt-5">
          {notice && <p className="text-danger text-center ">{notice}</p>}

          <Card className="card_trans">
            <div className="d-flex justify-content-between align-item-center mb-3">
              <h1 className="fs-5 text-muted">Rooms List</h1>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/add-rooms")}
              >
                Add New
              </button>
            </div>

            <table className="trans-table">
              <thead>
                <tr className="trans-head">
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r, i) => {
                  return (
                    <tr key={i}>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <td>{r._id}</td>
                      <td className="text-start">{r.title}</td>
                      <td className="text-start">{r.desc}</td>
                      <td>{r.price}</td>
                      <td>{r.maxPeople}</td>

                      <td className="d-flex gap-1">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => navigate(`/edit-room/${r._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteRoom(r._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Rooms;
