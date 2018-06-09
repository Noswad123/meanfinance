var mongoose = require('mongoose');
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res) {
  console.log("registering user");
  var username = req.body.username;
  var password = req.body.password;
  
  User.create({
    username : username,
    password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if (err) {
      res
        .status(400)
        .json(err)
    } else {
      res
        .status(200)
        .json(user)
    }
  })
}

module.exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  
  User
    .findOne({username: username})
    .exec(function(err, user) {
      if (err) {
        res
          .status(400)
          .json(err);
      }
        else if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          console.log("user found");
          var token = jwt.sign({ username: user.username }, "cdfinance", {expiresIn: 3600});
          res
            .status(200)
            .json({success: true, token: token});
        } else {
          console.log(res);
          console.log("username or password incorrect");
          res
            .status(401)
            .json("username or password incorrect");
        }
      } else {
        console.log("user not found");
        res
          .status(404)
          .json({"success": false});
      }
    })
}

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1] // -- Authorization bearer xxx
    jwt.verify(token, "cdfinance", function(err, decoded) {
      if (err) {
        res
          .status(401)
          .json("Unauthorized");
      } else {
        req.user = decoded.username;
        next();
      }
    })
  } else {
    res.status(403).json("No token provided");
  }
}

module.exports.depositFunds = function(req, res) {
  var username = req.params.username
  
  User
    .findOne({username: username})
    .exec(function(err, user) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        var newBalance = user.balance + parseFloat(req.body.amount);
        user.balance = newBalance;
        user.save(function(err, user) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else
            res
              .status(200)
              .json()
        })
      }
    });
}

module.exports.updateBalance = function(req, res) {
  var change;
  var change=req.body.change;
  var username = req.params.username;
  
  User
    .findOne({username: username})
    .exec(function(err, user) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
       user.balance += change;
       user.save(function(err, user) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else
            res
              .status(200)
              .json()
        })
      }
    });
}

module.exports.getUserBalance = function(req, res) {
  var username = req.params.username;
  
  User
    .findOne({username: username})
    .exec(function(err, user) {
      if (err) {
        res
          .status(400)
          .json(err);
      } else { 
        console.log('found user');
        var balance = user.balance
        res
          .status(200)
          .json(balance)
      }
    });
}