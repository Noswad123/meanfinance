angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  
    vm.find = function() {
    var symbol = vm.symbol;
    
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
      
      var data = {"symbol" : vm.symbol, "amount": vm.amount}
      
     $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
        console.log(response);
        
      }).catch(function(error) {
        console.log(error);
        
      });
      $location.path('/dashboard');
    } else {
      $location.path('/');
    }
  }
}