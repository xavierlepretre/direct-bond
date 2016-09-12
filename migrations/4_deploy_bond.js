module.exports = function(deployer, network) {
	var appId = "com-b9lab-directbond-edgware";
	var entitlementRegistryAddress;
	if (network != "edgware") {
		entitlementRegistryAddress = EntitlementRegistryMock.address;
	} else {
		entitlementRegistryAddress = "0xe5483c010d0f50ac93a341ef5428244c84043b54";
	}
	deployer.deploy(Bond, 
		10000, // Initial supply
		"B9Lab Bond", // Token Name
		0, // Decimal Units
		"B9LabBond", // Symbol
		entitlementRegistryAddress,
		appId)
		.then(function () {
			return BondListing.at(BondListing.address)
				.issueBond("b9lab", Bond.address, CouponCalculatorFixed.address);
		});
};