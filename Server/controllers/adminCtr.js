const User = require("../models/User");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.getCurrentUsers = (req, res, next) => {
  User.find({ isAdmin: false })
    .countDocuments()
    .then((count) => {
      if (!count) {
        res.status(404).json({ count: 0 });
      }
      return res.status(200).json({ count: count });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCurrentTrans = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 8;
  let numberOfOrder;
  Transaction.find()
    .countDocuments()
    .then((count) => {
      if (!count) {
        numberOfOrder = 0;
      }
      numberOfOrder = count;

      return Transaction.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .populate("hotel", "name");
    })

    .then((tran) => {
      if (!tran || tran.length === 0) {
        const error = new Error("No transaction available");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(200)
        .json({ transactions: tran, numberOfOrder: numberOfOrder });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((ht) => {
      if (!ht) {
        const error = new Error("No hotel available");
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json(ht);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteHotel = (req, res, next) => {
  const _id = req.params.id;
  Transaction.findOne({ hotel: _id })
    .then((tran) => {
      if (tran) {
        const err = new Error("Hotel exist in other activity");
        err.statusCode = 403;
        throw err;
      }
      return Hotel.findByIdAndDelete(_id);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted Hotel!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getRooms = (req, res, next) => {
  Room.find()
    .then((room) => {
      res.status(200).json(room);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postHotel = (req, res, next) => {
  const hotel = new Hotel({
    name: req.body.name,
    city: req.body.city,
    distance: req.body.distance,
    desc: req.body.desc,
    photos: req.body.photos,
    type: req.body.type,
    address: req.body.address,
    title: req.body.title,
    cheapestPrice: req.body.cheapestPrice,
    featured: req.body.featured,
    rooms: req.body.rooms,
  });

  hotel
    .save()
    .then((result) => {
      res.status(200).json({ message: "Save successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteRoom = (req, res, next) => {
  const _id = req.params.id;
  Transaction.findOne({ "room.id": _id })
    .then((tran) => {
      if (tran) {
        const err = new Error("Room exist in other transaction");
        err.statusCode = 403;
        throw err;
      }
      return Room.findByIdAndDelete(_id);
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted Room!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postRoom = (req, res, next) => {
  const hotelID = req.body.hotelID;

  const room = new Room({
    title: req.body.title,
    price: req.body.price,
    roomNumbers: req.body.roomNumbers,
    desc: req.body.desc,
    maxPeople: req.body.maxPeople,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  room
    .save()
    .then((result) => {
      return Hotel.findByIdAndUpdate(hotelID, {
        $push: { rooms: result._id.toString() },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Save successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTrans = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 9;
  let numberOfOrder;
  Transaction.find()
    .countDocuments()
    .then((count) => {
      if (!count) {
        numberOfOrder = 0;
      }
      numberOfOrder = count;

      return Transaction.find()

        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .populate("hotel", "name");
    })

    .then((tran) => {
      if (!tran || tran.length === 0) {
        const error = new Error("No transaction available");
        error.statusCode = 404;
        throw error;
      }
      return res
        .status(200)
        .json({ transactions: tran, numberOfOrder: numberOfOrder });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Advanced
//////////// Hotel
exports.getEditHotel = (req, res, next) => {
  const hotelID = req.params.hotelID;
  Hotel.findOne({ _id: hotelID })
    .then((hotel) => {
      res.status(200).json(hotel);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putEditHotel = (req, res, next) => {
  const hotelID = req.params.hotelID;
  Hotel.findByIdAndUpdate(hotelID, { $set: req.body }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
//////////// Room

exports.getEditRoom = (req, res, next) => {
  const roomID = req.params.roomID;
  Room.findOne({ _id: roomID })
    .then((room) => {
      res.status(200).json(room);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putEditRoom = (req, res, next) => {
  const roomID = req.params.roomID;
  Room.findByIdAndUpdate(roomID, { $set: req.body }, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
