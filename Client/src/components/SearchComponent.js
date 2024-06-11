import "./SearchComponent.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns"; //npm install date-fns --save

export const SearchPopup = (props) => {
  const [openDate, setOpenDate] = useState(false);
  return (
    <div className="searchPopup">
      <h2>Search</h2>
      <form>
        <div className="destination">
          <label htmlFor="destination">Destination</label> <br />
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder={props.destination}
          />
        </div>

        <div className="checkin">
          <label htmlFor="checkin">Check-in Date</label>
          <br />
          <input
            type="text"
            id="checkin"
            name="checkin"
            onClick={() => setOpenDate(!openDate)}
            placeholder={`${format(
              props.date[0].startDate,
              "MM/dd/yyyy"
            )} to ${format(props.date[0].endDate, "MM/dd/yyyy")}`}
          />
          {openDate && (
            <DateRange
              className="date_pop"
              editableDateInputs={true}
              onChange={(item) => props.setDate([item.selection])}
              minDate={new Date()}
              ranges={props.date}
            />
          )}
        </div>

        <p>Options</p>
        <div className="minPrice">
          <label htmlFor="minPrice">Min price per night</label>

          <input type="number" id="minPrice" name="minPrice" />
        </div>

        <div className="maxPrice">
          <label htmlFor="maxPrice">Max price per night</label>

          <input type="number" id="maxPrice" name="maxPrice" />
        </div>

        <div className="Adult">
          <label htmlFor="Adult">Adult</label>
          <input
            type="number"
            id="Adult"
            name="Adult"
            placeholder={props.options.adult}
          />
        </div>

        <div className="Children">
          <label htmlFor="Children">Children</label>
          <input
            type="number"
            id="Children"
            name="Children"
            placeholder={props.options.children}
          />
        </div>

        <div className="Room">
          <label htmlFor="Room">Room</label>
          <input
            type="number"
            id="Room"
            name="Room"
            placeholder={props.options.room}
          />
        </div>

        <button className="search__but">Search</button>
      </form>
    </div>
  );
};

export const SearchList = (props) => {
  return (
    <div>
      {props.search.map((item) => (
        <SearchListItem
          name={item.name}
          distance={item.distance}
          tag={item.rooms[0].desc}
          type={item.rooms[0].title}
          description={item.desc}
          free_cancel="free cancel"
          price={item.cheapestPrice}
          rate={item.rating}
          rate_text="good"
          image_url={item.photos[0]}
          key={item.name}
        />
      ))}
    </div>
  );
};

const SearchListItem = (props) => {
  return (
    <div className="searchItem">
      <div className="imgItem">
        <img src={props.image_url} alt={props.name} className="searchImg" />
      </div>
      <div className="searchInfoHotel">
        <div className="nameRate">
          <h3>{props.name}</h3>
          <p className="searchRateText">{props.rate_text}</p>
          <p className="hotelSearchRate">{props.rate}</p>
        </div>
        <p className="searchDistance">{props.distance} from center</p>
        <p className="searchTag">{props.tag}</p>
        <h5>{props.description}</h5>
        <div className="roomPrice">
          <div className="roomDetail">
            <p>{props.type}</p>
            <h5>{props.free_cancel ? "Free cancellation" : ""}</h5>
            <p className="free_cancel">
              {props.free_cancel
                ? "You can cancel later, so lock in this great price today!"
                : ""}
            </p>
          </div>
          <div className="priceDetail">
            <p className="priceDetail_price">${props.price}</p>
            <p className="priceDetail_note">includes taxes and fees</p>
            <button className="priceDetail_but">See availability</button>
          </div>
        </div>
      </div>
    </div>
  );
};
