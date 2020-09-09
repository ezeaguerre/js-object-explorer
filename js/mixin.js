function applyTo( target ) {
	const descriptors = Object.getOwnPropertyDescriptors( this.mixinData );
	const names = Object.getOwnPropertyNames( this.mixinData );

	names.forEach( name => {
		if ( Object.getOwnPropertyDescriptor( target, name ) )
			return;
		Object.defineProperty( target, name, descriptors[ name ] );
	} );

	return target;
}

function applyToClass( klass ) {
	return this.applyTo( klass.prototype );
}

function applyToMixin( mixin ) {
	return this.applyTo( mixin.mixinData );
}

function mixin( mixinData ) {
	return {
		mixinData,
		applyTo,
		applyToClass,
		applyToMixin
	};
}
