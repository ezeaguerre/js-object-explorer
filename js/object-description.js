class ObjectDescription extends Widget {
	constructor( anObject ) {
		super();
		this.object = anObject;
		this.oldObject = Object.clone( anObject );
		this.setupCanvas();
	}

	setupCanvas() {
		this.canvas = document.createElement( 'select' );
		this.canvas.height = '100%';
		this.canvas.multiple = true;
		this.addProperties();
	}

	get list() {
		return this.canvas;
	}

	addProperties() {
		const names = Object.getOwnPropertyNames( this.object );
		for ( let n of names ) {
			const descriptor = Object.getOwnPropertyDescriptor( this.object, n );
			let name = [];
			if ( descriptor.get ) name.push( 'get' );
			if ( descriptor.set ) name.push( 'set' );
			name = name.join( '/' ) + ' ' + n;

			let value = '';
			if ( descriptor.get !== undefined )
				value = 'get: ' + descriptor.get.toString() + ' ';
			if ( descriptor.set !== undefined )
				value = value + 'set: ' + descriptor.set.toString() + ' ';
			if ( descriptor.value !== undefined )
				value = value + Object.printString( descriptor.value );

			this.addOption( `${ name }: ${ value }` );
		}
	}

	worldStep() {
		if ( Object.equals( this.oldObject, this.object ) )
			return;
		this.oldObject = Object.clone( this.object );
		this.list.innerHTML = '';
		this.addProperties();
	}

	addOption( label ) {
		const opt = document.createElement( 'option' );
		opt.innerHTML = label;
		this.list.add( opt );
	}
}

class TextualDescription extends Widget {
	constructor( anObject ){
		super();
		this.canvas.style.flex = 1;
		this.canvas.innerHTML = Object.printString( anObject );
	}
}
