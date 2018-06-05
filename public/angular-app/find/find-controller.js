angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  
  console.log("findController");
  console.log(vm);
  vm.find = function() {
    var symbol = vm.symbol;
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
       vm.isFound=true;
      console.log(vm.isFound);
     
      var stockprice = response.data.price;
      vm.stockprice = stockprice;
    }).catch(function(error) {
      if (error) {
        vm.isFound=false;
        vm.error = error;
        console.log("The stock is found:" + vm.isFound);
        
      }
      else
      {
        vm.isFound = true;
      }
    });
  };
}