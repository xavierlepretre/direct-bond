import "EntitlementI.sol";
import "EntitlementRegistryI.sol";

contract Restricted {
	// BlockOne ID bindings
	EntitlementRegistryI public entitlementRegistry;
	string public appId;

	function getEntitlement() constant returns(address) {
		return entitlementRegistry.getOrThrow(appId);
	}

	modifier entitledUsersOnly {
	  if (!EntitlementI(getEntitlement()).isEntitled(msg.sender)) throw;
	  _
	}

	function Restricted(address _entitlementRegistryAddress, string _appId) {
		entitlementRegistry = EntitlementRegistryI(_entitlementRegistryAddress);
		appId = _appId;
	}
}