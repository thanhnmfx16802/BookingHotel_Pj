import classes from "./HotelList.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const HotelList = () => {
  const [rateHotel, setRateHotel] = useState([]);
  useEffect(() => {
    const getRateHotel = async () => {
      try {
        const response = await fetch("http://localhost:5000/toprate");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        setRateHotel(data);
      } catch (err) {
        console.log(err);
      }
    };
    getRateHotel();
  }, []);

  return (
    <div className={classes.hotel}>
      <h2>Homes guests love</h2>
      <div className={classes.showHotel}>
        {rateHotel.map((hotel) => {
          return (
            <HotelComponent
              _id={hotel._id}
              image_url={hotel.photos[0]}
              name={hotel.name}
              city={hotel.city}
              price={hotel.cheapestPrice}
              key={hotel.name}
            />
          );
        })}
      </div>
    </div>
  );
};

const HotelComponent = (props) => {
  return (
    <div className={classes.hotelName}>
      <Link to={`/detail/${props._id}`}>
        <img
          src={props.image_url}
          alt={props.name}
          className={classes.hotelNameImg}
        />
        <h3>{props.name}</h3>
      </Link>
      <p>{props.city}</p>
      <h4>Starting from ${props.price}</h4>
    </div>
  );
};
