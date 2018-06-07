angular.module('cdfinance').controller("FindController", FindController);

function FindController($http) {
  var vm = this;
  
  console.log("findController");
      var symbol = vm.symbol;
    //function stockList() {
      //$http.get('/api/stocks').then(function(response) {
        $http.get("/api/stocks/" + symbol).then(function(response) {
          vm.stocks = response.data;
          console.log(response.data);
        });
}
    // vm.search = function() {
        
    //     var symbol = vm.Symbol;
    //     $http.get("/api/stocks/" + symbol).then(function(response) {
    //     vm.isFound=true;
    //     console.log(vm.isFound);
      
      
    //   	//stockDataFactory.stocksGetSymbol(symbol).then(function(response) { 
		  //   //console.log(response); 
		    
		  //       if (response.data){
		  //           vm.stocks = response.data;        
		  //           //stockDataFactory.postSymbol({symbol: symbol}).then(function(response){
    // 	           // console.log(response);
    //     	       // }).catch(function(error){
    //     	       //         console.log(error);
    //     	       // });
    //   	        }
    //     }).catch(function(error){
    // 	    if (error){
    //     		console.log(error);
    //     		vm.error = "No stocks match symbol: " + symbol;
    // 	    }
    // 	});
    //};
    
  //   vm.find = function() {
  //   var symbol = vm.symbol;
    
  //   $http.get("/api/stocks/" + symbol).then(function(response) {
  //     vm.isFound=true;
  //     console.log(vm.isFound);
    
  //     //vm.stocks = response.data; 
  //     var stockprice = response.data.price;
  //     vm.stockprice = stockprice;
  //   }).catch(function(error) {
  //     if (error) {
  //       vm.isFound=false;
  //       vm.error = error;
  //     }
  //     else
  //     {
  //       vm.isFound = true;
  //     }
  //   });
  // };
//}