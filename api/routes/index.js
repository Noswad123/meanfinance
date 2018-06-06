var express = require('express');
var router = express.Router();

var stocksCtrl = require('../controllers/stocks.controller.js');
var usersCtrl = require('../controllers/users.controller.js');
var boughtStocksCtrl = require('../controllers/boughtStocks.controller.js');

router
  .route('/users/:username/stocks')
  .get(boughtStocksCtrl.bStocksGetAll)
  
router
  .route('/users/:username/stocks')
  .post(boughtStocksCtrl.bStocksBuy)
  
router
  .route('/users/:username/stocks/:symbol')
  // .get(boughtStocksCtrl.bStocksGetOne) // currently no data. need for single display
  //.post(boughtStocksCtrl.bstockBuy)
  .delete(boughtStocksCtrl.bStocksSellAll) // sell all stocks
  
router
  .route('/users/:username/deposit')
  .put(usersCtrl.depositFunds)
  
router
  .route('/users/:username')
  .get(usersCtrl.getUserBalance)
  
router
  .route('/stocks/:symbol')
  .get(stocksCtrl.stocksGetPrice); // confirm stock validity and get price from API
  
router
  .route('/users/register')
  .post(usersCtrl.register);
  
router
  .route('/users/login')
  .post(usersCtrl.login);
  
module.exports = router;