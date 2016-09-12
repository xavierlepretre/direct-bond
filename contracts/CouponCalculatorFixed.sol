import "CouponCalculatorI.sol";

contract CouponCalculatorFixed is CouponCalculatorI {
	uint rate;

	function FixedCouponCalculator(uint _rate) {
		rate = _rate;
	}

	function getRate() returns (uint _rate) { // 1% => 1000
		_rate = rate;
	}
}