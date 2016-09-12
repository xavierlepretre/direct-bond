import "EntitlementRegistryI.sol";

contract EntitlementRegistryMock is EntitlementRegistryI {
	address public entitlement;

	function EntitlementRegistryMock(address _entitlement) {
		entitlement = _entitlement;
	}

	function get(string _name) 
		constant
		returns(address) {
		return entitlement;
	}

	function getOrThrow(string _name)
		constant
		returns(address) {
		return entitlement;
	}
}