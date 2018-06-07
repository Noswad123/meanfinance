angular.module('cdfinance').controller('DetailController', DetailController);

function DetailController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  console.log(this);
 
    vm.find = function() {
    var symbol = vm.symbol;
    console.log(symbol);
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
       vm.isFound=true;
      var stockprice = response.data.price;
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.isFound=false;
        vm.error = error;
      }
      else
      {
        vm.isFound = true;
      }
    });
  };
}