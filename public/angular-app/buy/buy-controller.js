angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  
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
  
  vm.buy = function() {
    if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      var username = decodedToken.username;
      
      var data = {"symbol" : vm.symbol.toLocaleUpperCase(), "amount": vm.amount}
      console.log(data);
     $http.post('/api/users/'+ username +"/stocks/"+vm.symbol, data).then(function(response) {
        //check the responses
             $location.path('/dashboard');
      }).catch(function(error) {
        console.log(error);
        
      });
      
    } else {
      $location.path('/');
    }
  }
}