const User = require("../models/User");

exports.postAddUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        const err = new Error("Email is available. Please chose another one");
        err.statusCode = 401;
        throw err;
      }

      const user = new User({
        username: username,
        email: email,
        password: password,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json("Register successfully!");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        const err = new Error("Email or Password is incorrect!");
        err.statusCode = 401;
        throw err;
      }
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLoginAdmin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        const err = new Error("Email or Password is incorrect!");
        err.statusCode = 404;
        throw err;
      }

      if (user && user.isAdmin === false) {
        const err = new Error("Not admin account");
        err.statusCode = 401;
        throw err;
      }
      console.log(user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
