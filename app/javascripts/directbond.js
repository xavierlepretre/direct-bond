var app = angular.module('directBondApp', []);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app.controller("directBondController", [ '$scope', '$location', '$http', '$q', '$window', '$timeout', function($scope , $location, $http, $q, $window, $timeout) {
    
    $scope.bondIssues = [
		// {
			// issuer: address
			// isin: bytes
			// token: address
			// rate: floating
			// rateCalculator: address
		// }
    ];

    CouponCalculatorFixed.setNetwork(909);
    Bond.setNetwork(909);
    $scope.couponCalculatorFixed = CouponCalculatorFixed.deployed();
    $scope.b9labBond = Bond.deployed();

    $scope.loadBondIssues = function () {

    	BondListing.setNetwork(909);
    	var bondListing = BondListing.deployed();
        console.log("BondListing address: " + bondListing.address);

    	bondListing.getIssuerCount.call()
    		.then(function (issuerCount) {
    			issuerCount = issuerCount.valueOf();
    			console.log("issuerCount: " + issuerCount);
    			for (var issuerIndex = 0; issuerIndex < issuerCount; issuerIndex++) {
    				console.log("issuerIndex: " + issuerIndex);
    				bondListing.issuers(issuerIndex)
    					.then(function (issuer) {
    						console.log("issuer: " + issuer);
    						bondListing.getIssuerBondCount.call(issuer)
    							.then(function (isinCount) {
    								isinCount = isinCount.valueOf();
    								console.log("isinCount: " + isinCount);
    								for (var isinIndex = 0; isinIndex <  isinCount; isinIndex++) {
    									console.log("isinIndex: " + isinIndex);
    									bondListing.getIssuerBondIsin.call(issuer, isinIndex)
    										.then(function (isin) {
    											isin = web3.toUtf8(isin);
    											console.log("isin: " + isin);
    											bondListing.getBondEntry.call(issuer, isin)
    												.then(function (bondEntry) {
    													console.log("bondEntry: " + bondEntry);
    													CouponCalculatorI.at(bondEntry[1])
    														.getRate.call()
    														.then(function (rate) {
		    													$timeout(function () {
		    														$scope.bondIssues.push({
		    															issuer: issuer,
		    															isin: isin,
		    															token: bondEntry[0],
		    															rate: rate + " /1000 %",
		    															rateCalculator: bondEntry[1]
		    														});
		    														console.log($scope.bondIssues);
		    													});
    														})
    												})
    										});
    								}
    							});
    					});
    			}
    		});
    };

    $scope.issueBond = function (newIsin, newToken, newRateCalculator) {
		var account = walletBar.getCurrentAccount(); // get account selected in wallet bar
        if (!account) return alert("You must log in to transact");
        walletBar.createSecureSigner();

        BondListing.setNetwork(909);
        var bondListing = BondListing.deployed();
        console.log("BondListing address: " + bondListing.address);
        console.log("Account for txn: " + account);
        console.log("isin: " + newIsin);
        console.log("token: " + newToken);
        console.log("rateCalculator: " + newRateCalculator);

    	bondListing.issueBond.call(
    		newIsin,
    		newToken,
    		newRateCalculator,
    		{ from: account, gas: 3000000 })
    		.then(function (success) {
    			console.log("success is: " + success);
		    	return bondListing.issueBond(
		    		newIsin,
		    		newToken,
		    		newRateCalculator,
		    		{ from: account, gas: 3000000 });
    		})
    		.then(function (txn) {
    			console.log(txn);
    		})
    		.catch(function (e) {
    			console.error("Failed to issue");
    			console.error(e);
    		});

    };

	$window.onload = function () {
		
		walletBar = new WalletBar({
            dappNamespace: dappId
        });

        web3 = new Web3();
        var provider = walletBar.getHook('edgware');
        web3.setProvider(provider);
        BondListing.setProvider(provider);
        Bond.setProvider(provider);
        Bond.setNetwork(909);
        CouponCalculatorI.setProvider(provider);
        CouponCalculatorFixed.setNetwork(909);

		$scope.loadBondIssues();
	};

}]);