angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  console.log("findController");
  vm.find = function() {
    var symbol = vm.symbol
    console.log(symbol)
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      var stockprice = response.data.price
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }
}