module.exports = function(deployer, network) {
	if (network != "edgware") {
		deployer.deploy(EntitlementMock)
			.then(function () {
				return deployer.deploy(EntitlementRegistryMock, EntitlementMock.address);
			})
			.then(function () {
				return EntitlementMock.at(EntitlementMock.address)
					.setEntitled(web3.eth.accounts[0], true);
			});
	} else {
		// In Edgware: EntitlementRegistry address = "0xe5483c010d0f50ac93a341ef5428244c84043b54"
	}
};
