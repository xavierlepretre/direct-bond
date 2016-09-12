import "Owned.sol";
import "Token.sol";
import "Restricted.sol";

contract Bond is Owned, Token, Restricted {
	function Bond(
		uint256 initialSupply,
		string tokenName,
		uint8 decimalUnits,
		string tokenSymbol,
		address entitlementRegistryAddress,
		string appId) 
		Token(initialSupply, tokenName, decimalUnits, tokenSymbol)
		Restricted(entitlementRegistryAddress, appId) {
	}
}