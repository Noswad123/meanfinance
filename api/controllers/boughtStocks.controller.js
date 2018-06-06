var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');
var User = mongoose.model('User');
var stockPrice = require('./shared/stockPrice.js')


module.exports.bStocksGetAll = function(req, res) {
  
  var username = req.params.username;
  console.log("looking for user", username);
  
  User
    .findOne({username: username})
    .exec(function(err, user) {
      var response = {
        status : 200,
        message : user
      }
     
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!user) {
        response.status = 404;
        response.message = {
          "message" : "user not found"
        };
      } 
      
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        console.log('found user');
         
        //found the user. pull down the users stocks as well as the stocks current price
        var stocks = user.stocks;
        var prices = [];
        var temp;
        stocks.forEach( (stock) => {
          stockPrice.returnPrice(stock._id)
          //console.log(stockPrice.returnPrice("AAPL"));
         temp= stockPrice.returnPrice("AAPL");
          prices.push(temp);
          console.log(temp);
         
        });
        res
          .status(200)
          .json({"stocks" : stocks, "prices" : prices})
      }
    })
}



module.exports.bStocksBuy = function(req, res) {
  var symbol = req.body.symbol;
  
  console.log(req.body);
  
  //check if the stock is valid
  Stock
    .findById(symbol)
    .exec(function(err, stock) {
      if (err) {
        res
          .status(500)
          .json(err)
      } else if (!stock) {
        res
          .status(404)
          .json({"message" : "Stock not valid"});
      } else {
        //stock is valid. get the stocks price.)
        var price = stockPrice.returnPrice(symbol);
        var cost = parseInt(req.body.amount) * price;
        
        //find the user
        var username = req.params.username;
        
        User
          .findOne({username: username})
          .exec(function(err, user) {
            if (err) {
              res
                .status(500)
                .json(err)
            } else {
              var userBalance = user.balance
              if (cost > userBalance) {
                var json = {status: "lowBalance"}
                res
                  .status(200)
                  .json(json);
              } else {
                // enough funds Buy the stock
                var stocks = user.stocks
                stocks.push({
                  _id : symbol,
                  amount : req.body.amount
                })
                user.save(function(err, userUpdated) {
                  if (err) {
                    res
                      .status(500)
                      .json(err)
                  } else {
                    res
                      .status(200)
                      .json({status: "bought"});
                  }
                })
              }
            }
          })
        
        //once authentication is built update the users stocks.
        //first check if he already has said stock...
        console.log("did I make it?");
      }
    })
}

module.exports.bStocksSellAll = function(req, res) {
  var userId = req.params.userId
  // get the User
  User
    .findById(userId)
    .exec(function(err, user) {
      var response = {
        status : 200,
        message : user
      }
      
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!user) {
        response.status = 404;
        response.message = {
          "message" : "user not found"
        };
      } 
      
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        //found the user sell all stock.
        var symbol = req.params.symbol;
        var stock = user.stocks.id(symbol);
        var price = stockPrice.returnPrice(symbol);
        var income = price * stock.amount
        // we know how much money we are earning for this. give this user more money and
        // remove the stocks
        stock.remove();
        user.balance = user.balance + income;
        user.save(function(err, userUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
}

