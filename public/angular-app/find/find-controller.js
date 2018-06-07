angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  
  console.log("findController");
 
  vm.find = function(text) {
    var symbol = vm.symbol;
    if(vm.symbol!=""&&vm.symbol!=null){
    $http.get("/api/stocks/" + symbol).then(function(response) {
       vm.isFound=true;
      console.log(vm.isFound);
     
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
}