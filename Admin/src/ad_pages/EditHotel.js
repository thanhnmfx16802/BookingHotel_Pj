import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import Card from "./Card";
import "./addHotel.css";

const EditHotel = () => {
  const navigate = useNavigate();
  const { hotelID } = useParams();

  const [rooms, setRooms] = useState([]);
  const [originalDataHotel, setOriginalDataHotel] = useState({
    name: "",
    city: "",
    distance: 0,
    desc: "",
    type: "",
    address: "",
    title: "",
    photos: [],
    cheapestPrice: 0,
    featured: false,
    rooms: [],
  });

  const [error, setError] = useState(null);
  const [saveMess, setSaveMess] = useState(null);

  useEffect(() => {
    const getOriginalDataHotel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/edit/${hotelID}`
        );
        if (response.status !== 200) {
          throw new Error("Cannot fetch hotel from server");
        }
        const data = await response.json();
        setOriginalDataHotel(data);
      } catch (err) {
        console.log(err);
      }
    };
    getOriginalDataHotel();
  }, []);

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
    setOriginalDataHotel((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !originalDataHotel.photos ||
      !originalDataHotel.name ||
      !originalDataHotel.city ||
      !originalDataHotel.distance ||
      !originalDataHotel.desc ||
      !originalDataHotel.type ||
      !originalDataHotel.address ||
      !originalDataHotel.title ||
      !originalDataHotel.cheapestPrice ||
      !originalDataHotel.featured
    ) {
      setError("Please fill enough information for all fields!");
      return;
    }
    setError(null);

    const newHotel = {
      ...originalDataHotel,
      photos:
        typeof originalDataHotel.photos === "string"
          ? originalDataHotel.photos.split(",")
          : originalDataHotel.photos,
    };
    // console.log(newHotel);
    try {
      const response = await fetch(
        `http://localhost:5000/admin/edit/${hotelID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHotel),
          credentials: "same-origin",
          mode: "cors",
        }
      );

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
        <h5 className="text-success mt-3 mb-4 text-center">Edit Hotel</h5>
        <div className="form-wrap d-flex justify-content-between  ms-5 me-5">
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={originalDataHotel.name}
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
                value={originalDataHotel.city}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="distance">Distance from City center</label>
              <input
                type="number"
                id="distance"
                value={originalDataHotel.distance}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                value={originalDataHotel.desc}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-4">
              <label htmlFor="photos">Image</label>
              <textarea
                type="text"
                id="photos"
                value={originalDataHotel.photos}
                placeholder="Please put image urls here, use comma ',' to seperate urls and no blank"
                className="fst-italic"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="d-flex flex-column w-50">
            <div className="d-flex flex-column mb-4">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                value={originalDataHotel.type}
                className="border-0 border-bottom "
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={originalDataHotel.address}
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={originalDataHotel.title}
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label htmlFor="cheapestPrice">Price</label>
              <input
                type="number"
                id="cheapestPrice"
                value={originalDataHotel.cheapestPrice}
                className="border-0 border-bottom"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="featured">Featured</label>
              <select
                id="featured"
                value={originalDataHotel.featured}
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
          <label htmlFor="rooms">Rooms</label>

          <select id="rooms" multiple disabled value={originalDataHotel.rooms}>
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
            Save
          </button>
        </div>
      </Card>
    </div>
  );
};
export default EditHotel;
