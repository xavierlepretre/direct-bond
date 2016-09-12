import"EntitlementI.sol";

contract EntitlementMock is EntitlementI {
	mapping(address => bool) entitlements;

	function setEntitled(address _address, bool isEntitled) 
		returns (bool success) {
		entitlements[_address] = isEntitled;
		success = true;
	}

	function isEntitled(address _address)
		constant
		returns(bool isEntitled) {
		isEntitled = entitlements[_address];
	}
}