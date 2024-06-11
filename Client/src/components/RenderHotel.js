import classes from "./RenderHotels.module.css";
import { useState, useEffect } from "react";

export const RenderHotel = () => {
  const [typeName, setTypeName] = useState("");
  const [typeCount, setTypeCount] = useState("");

  useEffect(() => {
    const getHotel = async () => {
      try {
        const response = await fetch("http://localhost:5000/type");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const getTypeName = Object.keys(data);
        const getTypeCount = Object.values(data);
        setTypeName(getTypeName);
        setTypeCount(getTypeCount);
      } catch (err) {
        console.log(err);
      }
    };
    getHotel();
  }, []);
  const propType = [
    {
      name: typeName[0],
      count: typeCount[0],
      image: "./images/type_1.webp",
    },
    {
      name: typeName[1],
      count: typeCount[1],
      image: "./images/type_2.jpg",
    },
    {
      name: typeName[2],
      count: typeCount[2],
      image: "./images/type_3.jpg",
    },
    {
      name: typeName[3],
      count: typeCount[3],
      image: "./images/type_4.jpg",
    },
    {
      name: typeName[4],
      count: typeCount[4],
      image: "./images/type_5.jpg",
    },
  ];

  return (
    <div className={classes.renderHotel}>
      <h2>Browse by property type</h2>
      <div className={classes.hotelList}>
        {propType.map((type, i) => {
          return (
            <div key={i} className={classes.hotelItem}>
              <img
                src={type.image}
                alt={type.name}
                className={classes.hotelImg}
              />
              <h3>{type.name}</h3>
              <p>{type.count} hotels</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
