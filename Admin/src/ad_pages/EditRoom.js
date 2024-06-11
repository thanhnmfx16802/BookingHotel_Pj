import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import "./addHotel.css";

const EditRoom = () => {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const [originalDataRoom, setOriginalDataRoom] = useState({
    title: "",
    price: 0,
    roomNumbers: [],
    desc: "",
    maxPeople: 0,
  });
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [saveMess, setSaveMess] = useState(null);

  useEffect(() => {
    const getOriginalDataHotel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/edit-room/${roomID}`
        );
        if (response.status !== 200) {
          throw new Error("Cannot fetch room from server");
        }
        const data = await response.json();
        setOriginalDataRoom(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOriginalDataHotel();
  }, [roomID]);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/hotels");

        if (response.status !== 200) {
          throw new Error("Cannot fetch room from server");
        }
        const data = await response.json();

        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    };
    getHotels();
  }, []);

  const handleChange = (e) => {
    setOriginalDataRoom((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !originalDataRoom.title ||
      !originalDataRoom.price ||
      !originalDataRoom.roomNumbers ||
      !originalDataRoom.maxPeople ||
      !originalDataRoom.desc
    ) {
      setError("Please fill enough information for all fields!");
      return;
    }
    setError(null);

    const newRoom = {
      ...originalDataRoom,
      roomNumbers:
        typeof originalDataRoom.roomNumbers === "string"
          ? originalDataRoom.roomNumbers.split(",")
          : originalDataRoom.roomNumbers,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/admin/edit-room/${roomID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRoom),
          credentials: "same-origin",
          mode: "cors",
        }
      );

      if (response.status !== 200) {
        throw new Error(
          " Cannot edit because something went wrong with server"
        );
      }
      setSaveMess(null);
      navigate("/all-rooms");
    } catch (err) {
      setSaveMess(err.message);
    }
  };

  return (
    <div className="d-flex gap-4 justify-content-center">
      <SideBar />
      <Card className="w-75 mt-4">
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {saveMess && (
          <p style={{ color: "red", textAlign: "center" }}>{saveMess}</p>
        )}
        <h5 className="text-success mt-3 mb-4 text-center">Edit Room</h5>
        <div className="form-wrap d-flex justify-content-between  ms-5 me-5">
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={originalDataRoom.title}
                // border-0 removes all borders, border-bottom adds a bottom border to the input field
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={originalDataRoom.price}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="roomNumbers">Rooms</label>
              <textarea
                type="text"
                id="roomNumbers"
                value={originalDataRoom.roomNumbers}
                placeholder="Please put room number here, use comma ',' to seperate rooms and no blank"
                className="fst-italic"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                value={originalDataRoom.desc}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="maxPeople">Max People</label>
              <input
                type="number"
                id="maxPeople"
                value={originalDataRoom.maxPeople}
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="hotelID">Choose a hotel</label>
              <select id="hotelID" disabled onChange={handleChange}>
                <option key="select hotel" value="" hidden>
                  Select 1 hotel
                </option>
                {hotels.map((item, i) => {
                  return (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="room-list">
          <button className="btn btn-success m-5" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EditRoom;
