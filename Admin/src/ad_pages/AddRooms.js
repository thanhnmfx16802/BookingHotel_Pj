import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import "./addHotel.css";

const AddRooms = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const [roomNum, setRoomNum] = useState([]);
  const [dataRoom, setDataRoom] = useState({});
  const [error, setError] = useState(null);
  const [saveMess, setSaveMess] = useState(null);

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
    setDataRoom((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !dataRoom.title ||
      !dataRoom.price ||
      !roomNum ||
      !dataRoom.maxPeople ||
      !dataRoom.hotelID ||
      !dataRoom.desc
    ) {
      setError("Please fill enough information for all fields!");
      return;
    }
    setError(null);
    const roomNumArr = roomNum.split(",");
    const newRoom = {
      title: dataRoom.title,
      price: +dataRoom.price,
      roomNumbers: roomNumArr,
      desc: dataRoom.desc,
      maxPeople: +dataRoom.maxPeople,
      hotelID: dataRoom.hotelID,
    };
    console.log(newRoom);
    try {
      const response = await fetch("http://localhost:5000/admin/add-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
        credentials: "same-origin",
        mode: "cors",
      });

      if (response.status !== 200) {
        throw new Error(
          " Cannot save beacuse something went wrong with server"
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
        <h5 className="text-primary mt-3 mb-4 text-center">Add New Room</h5>
        <div className="form-wrap d-flex justify-content-between  ms-5 me-5">
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
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
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="roomNumbers">Rooms</label>
              <textarea
                type="text"
                id="roomNumbers"
                placeholder="Please put room number here, use comma ',' to seperate rooms and no blank"
                className="fst-italic"
                onChange={(e) => setRoomNum(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="maxPeople">Max People</label>
              <input
                type="number"
                id="maxPeople"
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="hotelID">Choose a hotel</label>
              <select id="hotelID" onChange={handleChange}>
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
            Send
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AddRooms;
