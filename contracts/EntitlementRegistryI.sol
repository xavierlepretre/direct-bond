contract EntitlementRegistryI {
	function get(string _name) 
		constant
		returns(address );

	function getOrThrow(string _name)
		constant
		returns(address );
}
  