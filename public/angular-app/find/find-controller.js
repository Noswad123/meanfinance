angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  var isfound = true;
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
        isfound = false;
        vm.error = error;
        console.log(vm.error);
      }
      else
      {
        isfound = true;
      }
      
    })
  }
}