import "./DetailComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import BookHotel from "./BookHotel";
import { useState } from "react";

export const DetailComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="detailHotelWrapper">
      <div className="detailHotelFlex">
        <div className="detailHotelInfo">
          <h2>{props.infoHotel.name}</h2>
          <p className="detailHotelName">
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            {props.infoHotel.address}
          </p>
          <p className="detailHotelDistance">{`${props.infoHotel.distance}m from center`}</p>
          <p className="detailHotelPrice">{`$${props.infoHotel.cheapestPrice}`}</p>
        </div>
        <button>Reserve or Book Now!</button>
      </div>

      <div className="detailPhotoWrap">
        {props.infoHotel.photos.map((photoUrl, index) => {
          return (
            <div key={index} className="detailPhotoList">
              <img src={photoUrl} alt={photoUrl} className="imgUrlDetail" />
            </div>
          );
        })}
      </div>

      <div className="detailDescrWrap">
        <div className="detail_Desc">
          <h3>{props.infoHotel.title}</h3>
          <p>{props.infoHotel.desc}</p>
        </div>

        <div className="detailPriceArticle">
          <p className="detailPriceAmount">
            <span>{`$${props.infoHotel.cheapestPrice}`}</span> (1 nights)
          </p>
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            Reserve or Book Now!
          </button>
        </div>
      </div>
      {isOpen && <BookHotel idHotel={props.infoHotel._id} />}
    </div>
  );
};
