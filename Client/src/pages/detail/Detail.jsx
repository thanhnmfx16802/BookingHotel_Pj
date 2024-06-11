import { DetailComponent } from "../../components/DetailComponent";
import { RegisterComponent } from "../../components/RegisterComponent";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Detail = () => {
  const param = useParams();
  const [error, setError] = useState(null);
  const [detailHotel, setDetailHotel] = useState([]);
  useEffect(() => {
    const getDetailHotel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/detail/${param.hotelID}`
        );

        const data = await response.json();

        if (response.status === 404) {
          setError(data.message);
          setDetailHotel([]);
        } else if (response.status === 200) {
          setError(null);
          setDetailHotel(data);
        } else {
          setError(data.message);
          setDetailHotel([]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDetailHotel();
  }, []);
  return (
    <div>
      {error && (
        <p style={{ textAlign: "center", color: "red", margin: "30px" }}>
          {error}
        </p>
      )}
      {detailHotel.length !== 0 && (
        <div>
          <DetailComponent infoHotel={detailHotel[0]} />
          <RegisterComponent />
        </div>
      )}
    </div>
  );
};

export default Detail;
