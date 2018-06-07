var mongoose = require('mongoose');
var Stock = mongoose.model('Stock');
var https = require('https');
var stockPrice = require('./shared/stockPrice.js')

module.exports.stocksGetAll = function(req, res){
    
    console.log('Get the stocks');
    Stock
        .find()
        .exec(function(err, stocks){
            if(err){
                console.log("Error finding stocks");
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found stocks", stocks.length);
                res
                    .json(stocks);
            }
        });
};    


module.exports.stocksGetPrice = function(req, res) {

  var isFound=false;

  var symbols = req.params.symbol
var symbol = symbols.toLocaleUpperCase();
  console.log("looking up symbol:", symbol);
  
  Stock
    .findById(symbol)
    .exec(function(err, stock) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else if (!stock) {
        res
          .status(404)
          .json({ "message" : "Stock symbol invalid"})
      } else {
        //found the stock symbol it is a valid NASDAQ stock symbol pull data
        //from api.
        var price = stockPrice.getPrice(req, res, symbol);
        
      }
    });
  
};