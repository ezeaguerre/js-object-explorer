Object.defineProperty( Array.prototype, 'last', {
	configurable: true,
	enumerable: true,
	get: function last() {
		return this[ this.length - 1 ];
	},
	set: function last( value ) {
		this[ this.length - 1 ] = value;
		return value;
	}
} );
