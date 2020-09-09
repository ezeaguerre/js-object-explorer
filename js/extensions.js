function ___defineArrayOrdinalAccessor( name, order ) {
	Object.defineProperty( Array.prototype, name, {
		configurable: true,
		enumerable: true,
		get: function () {
			if ( this.length === 0 )
				throw new Error( `Tryed to get the ${name} element of an empty array` );
			return this[ order ];
		},
		set: function ( value ) {
			this[ order ] = value;
			return value;
		}
	} );
}

___defineArrayOrdinalAccessor( 'first', 0 );
___defineArrayOrdinalAccessor( 'second', 1 );
___defineArrayOrdinalAccessor( 'third', 2 );

Object.defineProperty( Array.prototype, 'last', {
	configurable: true,
	enumerable: true,
	get: function last() {
		if ( this.length === 0 )
			throw new Error( 'Tryed to get the last element of an empty array' );
		return this[ this.length - 1 ];
	},
	set: function last( value ) {
		this[ this.length - 1 ] = value;
		return value;
	}
} );

Array.prototype.remove = function remove( elementOrPredicate ) {
	if ( typeof elementOrPredicate === 'function' )
		index =this.findIndex( elementOrPredicate );
	else
		index = this.findIndex( e => e === elementOrPredicate );

	if ( index >= 0 ) {
		this.splice( index, 1 );
		return true;
	}

	return false;
};

Array.prototype.findIfNone = function findIfNone( predicate, ifNoneValue ) {
	let element = this.find( predicate );
	if ( element === undefined && ifNoneValue !== undefined && ifNoneValue !== null )
		return ifNoneValue.evaluate();
	return element;
};

Array.prototype.contains = function contains( element ) {
	return this.findIndex( e => e === element ) !== -1;
}

Function.prototype.skipFirst = function skipFirst( nCalls = 1 ) {
	return (...args) => {
		if ( nCalls > 0 ) {
			nCalls--;
			return;
		}

		this( ...args );
	}
};

Function.prototype.evaluate = function evaluate( ...args ) {
	return this( ...args );
};

Object.defineProperty( Object.prototype, 'itself', {
	enumerable: true,
	configurable: true,
	get: function itself() {
		return this;
	}
} );

Object.prototype.evaluate = function evaluate() {
	return this;
}

const nullElement = {
	isInsideOf: () => false
};

HTMLElement.prototype.getParent = function getParent() {
	return this.parentElement || nullElement;
}

const VOWELS = [ 'a', 'e', 'i', 'o', 'u' ];

Object.defineProperty( String.prototype, 'first', {
	configurable: true,
	enumerable: true,
	get: function first() {
		if ( this.length === 0 )
			throw new Error( 'Tryed to get the first letter of an empty string' );
		return this[ 0 ];
	}
} );

Object.defineProperty( String.prototype, 'isVowel', {
	configurable: true,
	enumerable: true,
	get: function isVowel() {
		return VOWELS.indexOf( this.first.toLowerCase() ) !== -1;
	}
} );

Object.clone = function clone( anObject ) {
	let result = Object.create( Object.getPrototypeOf( anObject ) );
	const descriptors = Object.getOwnPropertyDescriptors( anObject );
	for ( let name of Object.getOwnPropertyNames( anObject ) )
		Object.defineProperty( result, name, descriptors[ name ] );
	return result;
};

Object.equals = function equals( obj1, obj2 ) {
	if ( Object.getPrototypeOf( obj1 ) !== Object.getPrototypeOf( obj2 ) )
		return false;

	const names1 = Object.getOwnPropertyNames( obj1 );
	const names2 = Object.getOwnPropertyNames( obj2 );

	if ( names1.length !== names2.length )
		return false;

	for ( let i = 0; i < names1.length; i++ ) {
		if ( names1[ i ] !== names2[ i ] )
			return false;
		const desc1 = Object.getOwnPropertyDescriptor( obj1, names1[ i ] );
		const desc2 = Object.getOwnPropertyDescriptor( obj2, names2[ i ] );

		if ( desc1.enumerable !== desc2.enumerable ||
			desc1.configurable !== desc2.configurable ||
			desc1.value !== desc2.value ||
			desc1.get !== desc2.get ||
			desc1.set !== desc2.set ||
			desc1.writable !== desc2.writable )
			return false;
	}

	return true;
};

String.prototype.articulize = function articulize() {
	return this.first.isVowel ? `an ${this}` : `a ${this}`;
}
