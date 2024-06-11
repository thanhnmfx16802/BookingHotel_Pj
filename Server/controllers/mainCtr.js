const User = require("../models/User");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.getHotel = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      const cities = ["Ha Noi", "Ho Chi Minh", "Da Nang"];
      // get the city name, save to array
      const cityList = hotels.map((city) => city.city);

      const countCity = {};
      // initialize the first value 0 for each city
      cities.forEach((city) => {
        countCity[city] = 0;
      });
      // count number of city
      cityList.forEach((city) => {
        // city is counted in cityList must appear in countCity to avoid error
        if (countCity.hasOwnProperty(city)) {
          countCity[city]++;
        }
      });
      return res.status(200).json(countCity);
    })
    .catch((err) => console.log(err));
};

// Function change the first letter to Uppercase
function makeCapitalFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.getType = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      const propType = ["Hotel", "Apartments", "Resorts", "Villas", "Cabins"];
      // get the type, save to array
      const propTypeList = hotels.map((item) => item.type);

      const countType = {};
      // initialize the first value 0 for each type
      propType.forEach((type) => {
        countType[type] = 0;
      });
      // count number of propType
      propTypeList.forEach((type) => {
        // type is counted in propTypeList array must appear in countType to avoid error
        if (countType.hasOwnProperty(makeCapitalFirstLetter(type))) {
          countType[makeCapitalFirstLetter(type)]++;
        }
      });
      return res.status(200).json(countType);
    })
    .catch((err) => console.log(err));
};

exports.getTopRate = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      // sort the hotel base on rating descending
      const hoteldes = [...hotels].sort((a, b) => b.rating - a.rating);
      // get top 3 rating hotel
      const topRate = hoteldes.slice(0, 3);
      // sort again the result based on original order in the array
      topRate.sort(
        (a, b) =>
          hotels.findIndex((ht) => ht.name === a.name) -
          hotels.findIndex((ht) => ht.name === b.name)
      );
      return res.status(200).json(topRate);
    })
    .catch((err) => console.log(err));
};

exports.postSearch = async (req, res, next) => {
  const destination = req.body.destination;
  const options = req.body.options;
  const numPeople = options.adult + options.children;
  const numRoom = options.room;

  const date = req.body.date[0].startDate;
  // Parse the initial timestamp
  const initialDate = new Date(date);
  // Add one day (in milliseconds)
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const newStartDate = new Date(initialDate.getTime() + oneDayInMilliseconds);

  try {
    const hotels = await Hotel.find({ city: destination });

    if (!hotels) {
      return res.status(404).json({ message: "No hotel found!" });
    }

    const roomPromises = hotels.map(async (ht) => {
      const roomIds = ht.rooms.map((roomId) => roomId);
      const rooms = await Room.find({
        _id: { $in: roomIds },
        createdAt: { $lte: newStartDate.toISOString() },
        maxPeople: { $gte: numPeople },
      }).exec();
      return { ...ht._doc, rooms };
    });

    const hotelsWithRooms = await Promise.all(roomPromises);

    const filteredHotel = hotelsWithRooms.filter(
      (ht) => ht.rooms.length >= numRoom
    );

    res.status(200).json(filteredHotel);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDetailHotel = (req, res, next) => {
  const hotelID = req.params.hotelID;

  Hotel.find({ _id: hotelID })
    .then((hotel) => {
      if (!hotel || hotel.length === 0) {
        return res.status(404).json({ message: "No detail hotel" });
      }
      res.status(200).json(hotel);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getRoom = (req, res, next) => {
  const hotelID = req.params.hotelID;

  Hotel.find({ _id: hotelID })
    .then((hotel) => {
      if (!hotel || hotel.length === 0) {
        const error = new Error("No room found due to hotel is unavailable");
        error.statusCode = 404;
        throw error;
      }
      return Room.find({ _id: { $in: hotel[0].rooms } });
    })
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postTrans = (req, res, next) => {
  const username = req.params.username;

  const userInfo = req.body.userInfo;
  const hotel = req.body.hotel;

  const room = req.body.room;
  const existingNums = new Set(room.map((item) => item.num));

  const dateStart = req.body.dateStart;

  const dateEnd = req.body.dateEnd;

  const price = req.body.price;
  const payment = req.body.payment;
  // const status = req.body.status;

  if (username) {
    Transaction.findOne({
      hotel: hotel,
      "room.num": { $in: Array.from(existingNums) },
      $or: [
        { dateStart: { $gte: dateStart, $lt: dateEnd } },
        { dateEnd: { $gt: dateStart, $lte: dateEnd } },
      ],
    })
      .then((prevTran) => {
        console.log(prevTran);
        if (prevTran) {
          const error = new Error(
            "This time your room is already booked! Please chose another time!"
          );
          error.statusCode = 401;
          throw error;
        }

        const transaction = new Transaction({
          user: userInfo,
          hotel,
          room,
          dateStart,
          dateEnd,
          price,
          payment,
          createdAt: new Date(),
          // status,
        });
        return transaction.save();
      })
      .then((result) => {
        res.status(200).json({ message: "created transaction" });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};

exports.getTrans = (req, res, next) => {
  const username = req.params.username;
  Transaction.find({ user: username })
    .populate("hotel", "name")
    .then((trans) => {
      if (!trans || trans.length === 0) {
        const err = new Error("User not yet create any transaction.");
        err.statusCode = 404;
        throw err;
      }
      return trans;
    })

    .then((tran) => {
      return res.status(200).json(tran);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
