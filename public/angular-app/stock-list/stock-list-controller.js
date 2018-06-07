/*global angular*/
//angular.module('meannasdaq').controller('StocksController', StocksController);
angular.module('cdfinance').controller("StocksController", StocksController);

function StocksController(stockDataFactory) {
    var vm = this;
    stockDataFactory.stockList().then(function(response){
        console.log(response);
    vm.stocks = response.data;
    });
    
    vm.search = function() {
        
        var symbol = vm.Symbol;
      	stockDataFactory.stocksGetSymbol(symbol).then(function(response) { 
		    console.log(response); 
		    vm.symbol = response.data;
		        if (response.data){
		            stockDataFactory.postSymbol({symbol: symbol}).then(function(response){
    	            console.log(response);
        	        }).catch(function(error){
        	                console.log(error);
        	        });
      	        }
        }).catch(function(error){
    	    if (error){
        		console.log(error);
        		vm.error = "No stocks match symbol: " + symbol;
    	    }
    	});
    };
}