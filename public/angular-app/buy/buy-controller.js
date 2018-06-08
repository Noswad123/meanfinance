angular.module('cdfinance').controller("BuyController", BuyController);

function BuyController($http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
 
  $http.get('/api/users/' + username).then(function(response) {
      vm.balance = response.data
    }).catch(function(error) {
        console.log(error);
        
      })
  }
  else {
    $location.path('/');
  }
  vm.buy = function() {
    if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
      var token = $window.sessionStorage.token;
      var decodedToken = jwtHelper.decodeToken(token);
      var username = decodedToken.username;
      var data = {"symbol" : vm.symbol, "amount": vm.amount, "cost":vm.cost}
      var symbol = vm.symbol.toLocaleUpperCase();
      $http.post('/api/users/'+ username +"/stocks/"+symbol, data).then(function(response) {
      //check the responses
        vm.find();
       
     
      }).catch(function(error) {
        console.log(error);
      });
      
    } else {
      $location.path('/');
    }
  }
  
 
 vm.deductBalance=function(){
   
   var data={"username":username,"change":-vm.cost}
  
   $http.put("/api/users/"+username+"/balance", data).then(function(response){
     
   }).catch(function(error) {
        console.log(error);
    });
   
 }
  vm.find = function() {
    var symbol = vm.symbol;
    
      $http.get("/api/stocks/" + symbol).then(function(response) {
        var stockprice = response.data.price;
        vm.price= stockprice;
        
         vm.wasteTime();
      }).catch(function(error) {
      
      });
  }
  vm.wasteTime=function(){
        $http.get("/api/stocks/"+vm.symbol).then(function(response) {
        vm.cost=vm.price*vm.amount;
        
          vm.deductBalance();
          $location.path('/dashboard');
        })
        .catch(function(error) {
      
      });
  }
 
  
}