import classes from "./RenderCity.module.css";
import { useState, useEffect } from "react";

export const RenderCity = () => {
  const [cityName, setCityName] = useState("");
  const [countCity, setCountCity] = useState("");

  useEffect(() => {
    const getCity = async () => {
      try {
        const response = await fetch("http://localhost:5000/city");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const getNameCity = Object.keys(data);
        const getNumberOfCity = Object.values(data);
        setCityName(getNameCity);
        setCountCity(getNumberOfCity);
      } catch (err) {
        console.log(err);
      }
    };
    getCity();
  }, []);

  const cityData = [
    {
      name: cityName[0],
      subText: countCity[0],
      image: "./City_Image/HaNoi.jpg",
    },
    {
      name: cityName[1],
      subText: countCity[1],
      image: "./City_Image/HCM.jpg",
    },
    {
      name: cityName[2],
      subText: countCity[2],
      image: "./City_Image/DaNang.jpg",
    },
  ];

  return (
    <div className={classes.renderCity}>
      {cityData.map((item, i) => {
        return (
          <div className={classes.listCity} key={i}>
            <img src={item.image} alt={item.name} className={classes.cityImg} />

            <h2>{item.name}</h2>
            <p>{`${item.subText} properties`}</p>
          </div>
        );
      })}
    </div>
  );
};
