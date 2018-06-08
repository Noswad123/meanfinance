angular.module('cdfinance').controller("DashboardController", DashboardController);

function DashboardController( $http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
    
    
    $http.get('/api/users/'+ username +"/stocks").then(function(response) {
      vm.stocks = response.data;
      
      vm.find(vm.stocks.stocks);
      
    }).catch(function(error) {
      console.log(error);
    })
    $http.get('/api/users/' + username).then(function(response) {
      vm.balance = response.data
    })
  } else {
    $location.path('/');
  }
  
  vm.find = function(stocks) {
    stocks.forEach((stock)=>{
      $http.get("/api/stocks/" + stock._id).then(function(response) {
        var stockprice = response.data.price;
        stock.price= stockprice;
      }).catch(function(error) {
        if (error) {
        
          vm.error = error;
        }
     
      });
    })
  }
  
  vm.detailView=function(symbol){
      $location.path('/detail/'+symbol)
  }
}