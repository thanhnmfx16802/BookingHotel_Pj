import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import "./addHotel.css";

const AddHotels = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [dataHotel, setDataHotel] = useState({});
  const [error, setError] = useState(null);
  const [saveMess, setSaveMess] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/rooms");

        if (response.status !== 200) {
          throw new Error("Cannot fetch room from server");
        }
        const data = await response.json();

        setRooms(data);
      } catch (err) {
        console.log(err);
      }
    };
    getRooms();
  }, []);

  const handleChange = (e) => {
    setDataHotel((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    // get value from select/option, current value is html collections
    const selectedValue = e.target.selectedOptions;
    // put html collection into array, and get value from collection to make value array
    const valueArr = Array.from(selectedValue, (option) => option.value);
    setSelectedRoom(valueArr);
  };
  // console.log(dataHotel);

  const handleSubmit = async () => {
    if (
      !imageUrl ||
      selectedRoom.length === 0 ||
      !dataHotel.name ||
      !dataHotel.city ||
      !dataHotel.distance ||
      !dataHotel.desc ||
      !dataHotel.type ||
      !dataHotel.address ||
      !dataHotel.title ||
      !dataHotel.price ||
      !dataHotel.featured
    ) {
      setError("Please fill enough information for all fields!");
      return;
    }
    setError(null);
    const imageUrlArr = imageUrl.split(",");
    const newHotel = {
      name: dataHotel.name,
      city: dataHotel.city,
      distance: dataHotel.distance,
      desc: dataHotel.desc,
      photos: imageUrlArr,
      type: dataHotel.type,
      address: dataHotel.address,
      title: dataHotel.title,
      cheapestPrice: +dataHotel.price,
      featured: dataHotel.featured,
      rooms: selectedRoom,
    };
    try {
      const response = await fetch("http://localhost:5000/admin/add-hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
        credentials: "same-origin",
        mode: "cors",
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong with server");
      }
      setSaveMess(null);
      navigate("/hotels");
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
        <h5 className="text-primary mt-3 mb-4 text-center">Add New Hotel</h5>
        <div className="form-wrap d-flex justify-content-between  ms-5 me-5">
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                // border-0 removes all borders, border-bottom adds a bottom border to the input field
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="distance">Distance from City center</label>
              <input
                type="number"
                id="distance"
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="desc"
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="image">Image</label>
              <textarea
                type="text"
                id="image"
                placeholder="Please put image urls here, use comma ',' to seperate urls and no blank"
                className="fst-italic"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="featured">Featured</label>
              <select
                id="featured"
                className="d-flex flex-column"
                onChange={handleChange}
              >
                <option value="" hidden>
                  Select featured
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ms-5 me-5">
          <label htmlFor="roomName">Rooms</label>

          <select id="roomName" multiple onChange={handleSelect}>
            {rooms.map((item, i) => {
              return (
                <option key={i} value={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
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
export default AddHotels;
