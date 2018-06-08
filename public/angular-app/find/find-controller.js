angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  console.log("findController");

  
  vm.findAll = function() {
      $http.get("/api/stocks/").then(function(response) {
      vm.isFound=true;

        vm.stocks = response.data; 
        console.log(response.data);
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

