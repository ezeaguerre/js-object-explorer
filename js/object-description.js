class ObjectDescription {
	constructor( object ) {
		this.x = 0;
		this.y = 0;
		this.w = 50;
		this.h = 100;
		this.o = object;
	}

	addToCanvas() {
		const div = document.createElement( 'div' );

		div.style.position = 'relative';
		div.style.width = '70px';
		div.style.top = '50px';
		div.style.left = '50px';
		div.style.margin = '0';
		div.style.paddingTop = '20px';
		div.style.backgroundColor = 'blue';
		div.style.border = '1px solid black';

		const list = document.createElement( 'select' );
		list.style.height = '100px';
		list.style.width = '69px';
		list.multiple = true;

		this.div = div;
		this.list = list;

		const names = Object.getOwnPropertyNames( this.o );
		for( let n of names )
			this.addOption( n );

		div.append( list );

		return div;
	}

	addOption( label ) {
		const opt = document.createElement( 'option' );
		opt.innerHTML = label;
		this.list.add( opt );
	}
}
