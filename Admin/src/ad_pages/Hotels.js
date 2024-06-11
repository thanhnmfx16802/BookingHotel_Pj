import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";

const Hotels = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/hotels");

        if (response.status === 404) {
          throw new Error("No Hotel available");
        }
        if (response.status !== 200) {
          throw new Error("Something went wrong with server!");
        }
        const data = await response.json();

        setHotels(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getHotels();
  }, [success]);

  const handleDeleteHotel = async (id) => {
    alert("Do you want to delete this hotel?");
    try {
      const response = await fetch(
        "http://localhost:5000/admin/delete-hotels/" + id,
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
          "Cannot delete this hotel because this hotel exist in other activity"
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
              <h1 className="fs-5 text-muted">Hotels List</h1>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/add-hotels")}
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
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((ht, i) => {
                  return (
                    <tr key={i}>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <td>{ht._id}</td>
                      <td>{ht.name}</td>
                      <td>{ht.type}</td>
                      <td>{ht.title}</td>
                      <td>{ht.city}</td>

                      <td className="d-flex gap-1">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => navigate(`/edit/${ht._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDeleteHotel(ht._id)}
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
export default Hotels;
