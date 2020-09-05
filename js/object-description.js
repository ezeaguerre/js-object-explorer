class ObjectDescription {
	constructor( object ) {
		this.x = 0;
		this.y = 0;
		this.w = 50;
		this.h = 100;
		this.o = object;
	}

	addToCanvas() {
		const list = document.createElement( 'select' );
		list.style.height = '100%';
		list.multiple = true;

		this.list = list;

		const names = Object.getOwnPropertyNames( this.o );
		for( let n of names )
			this.addOption( `${n}: ${this.o[n]}` );

		return list;
	}

	addOption( label ) {
		const opt = document.createElement( 'option' );
		opt.innerHTML = label;
		this.list.add( opt );
	}
}

DesktopChildMixin.applyToClass( ObjectDescription );
