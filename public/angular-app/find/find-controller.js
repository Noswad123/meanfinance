angular.module('cdfinance').controller("FindController", FindController);

function FindController($http,$location) {
  var vm = this;
   vm.search ="";
  console.log("findController");

  
  vm.findAll = function() {
    if(vm.search!="" && vm.search!=null){
   
      $http.get("/api/stocks/").then(function(response) {
      vm.isFound=true;

        vm.stocks = response.data; 
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
    vm.detailView=function(symbol){
      $location.path('/detail/'+symbol)
    }
  }

