import { SearchList } from "../../components/SearchComponent";
import { SearchPopup } from "../../components/SearchComponent";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./search.css";

const Search = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [error, setError] = useState(null);
  const [hotelSearch, setHotelSearch] = useState("");

  const searchHotel = async () => {
    const url = "http://localhost:5000/search";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",

        body: JSON.stringify({
          destination: location.state.destination,
          date: location.state.date,
          options: location.state.options,
        }),
      });

      const data = await response.json();

      if (response.status === 404) {
        console.log(data);
        setError(data.message);
      }
      if (data.length === 0) {
        console.log(data);
        setError("No hotel found!");
      }
      if (response.status === 200 && data.length !== 0) {
        console.log(data);
        setHotelSearch(data);
      }

      if (!response.ok) {
        throw new Error("Fetch signup failed!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    searchHotel();
  }, []);
  return (
    <div>
      {error && (
        <p style={{ textAlign: "center", color: "red", margin: "30px" }}>
          {error}
        </p>
      )}
      {hotelSearch && (
        <div className="searchArrange">
          <SearchPopup
            destination={destination}
            date={date}
            setDate={setDate}
            options={options}
          />
          <SearchList search={hotelSearch} />
        </div>
      )}
    </div>
  );
};

export default Search;
