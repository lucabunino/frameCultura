let up = $state(false)
let inverted = $state(false)

export function getHeader() {
	function setUp(u) {
		up = u
	}
	function setInverted(i) {
		inverted = i
	}
	return {
		get up() {
			return up;
		},
		setUp,
		get inverted() {
			return inverted;
		},
		setInverted,
	};
}