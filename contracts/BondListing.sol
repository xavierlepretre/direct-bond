import "Restricted.sol";
import "CouponCalculatorI.sol";
import "TokenI.sol";

contract BondListing is Restricted {
	struct BondEntry {
		bytes32 isin;
		TokenI token;
		CouponCalculatorI rateCalculator; // 1% => 1000
	}

	struct BondIssuer {
		address who;
		bytes32[] isins;
		mapping(bytes32 => BondEntry) bondEntries;
	}

	mapping(address => BondIssuer) public bondIssues;
	address[] public issuers;

	modifier noValue {
		if (msg.value > 0) throw;
		_
	}

	function BondListing(address entitlementRegistryAddress, string appId) 
		Restricted(entitlementRegistryAddress, appId) {
	}

	function issueBond(bytes32 isin, address token, address rateCalculator) 
		entitledUsersOnly
		returns (bool success) {
		if (bondIssues[msg.sender].who == 0) {
			bondIssues[msg.sender].who = msg.sender;
			issuers.push(msg.sender);
		}
		if (bondIssues[msg.sender].bondEntries[isin].isin == 0) {
			bondIssues[msg.sender].bondEntries[isin] = BondEntry({
				isin: isin,
				token: TokenI(token),
				rateCalculator: CouponCalculatorI(rateCalculator)
			});
			bondIssues[msg.sender].isins.push(isin);
		}
		success = true;
	}

	function getIssuerCount() 
		noValue
		returns (uint count) {
		count = issuers.length;
	}

	function getIssuerBondCount(address issuer)
		noValue
		returns (uint count) {
		count = bondIssues[issuer].isins.length;
	}

	function getIssuerBondIsin(address issuer, uint index)
		noValue
		returns (bytes32 isin) {
		isin = bondIssues[issuer].isins[index];
	}

	function getBondEntry(address issuer, bytes32 isin)
		noValue
		returns (address token, address rateCalculator) {
		BondEntry entry = bondIssues[issuer].bondEntries[isin];
		token = entry.token;
		rateCalculator = entry.rateCalculator;
	}
}