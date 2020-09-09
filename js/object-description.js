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
		for ( let n of names )
			this.addOption( `${ n }: ${ this.object[ n ] }` );
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
