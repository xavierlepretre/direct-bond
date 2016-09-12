module.exports = function(deployer, network) {
	var appId = "com.b9lab.directbond";
	var entitlementRegistryAddress;
	if (network != "edgware") {
		entitlementRegistryAddress = EntitlementRegistryMock.address;
	} else {
		entitlementRegistryAddress = "0xe5483c010d0f50ac93a341ef5428244c84043b54";
	}
	console.log("entitlementRegistryAddress: " + entitlementRegistryAddress);
	deployer.deploy([
		[BondListing, entitlementRegistryAddress, appId],
		[CouponCalculatorFixed, 5000]
	]);
};