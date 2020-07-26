class ObjectDesktop {
	constructor( element ) {
		this.element = element;
		this.currentChild = null;
		this.children = [];
		this.offset = {};

		document.addEventListener( 'mousemove', evt => this.onMouseMove( evt ) );
		document.addEventListener( 'mouseup', evt => this.offset = null );
		document.addEventListener( 'mousedown', evt => {
			console.log( 'mouse down' );
			const child = this.children.filter( c => c === evt.target );
			if ( child.length === 1 ) {
				this.offset = { x: evt.offsetX, y: evt.offsetY };
				this.focusOn( child[ 0 ] );
			}
		} );
	}

	addObject( object ) {
		const child = object.addToCanvas( this.element );
		this.element.append( child );
		this.children.push( child );
	}

	focusOn( child ) {
		if ( this.currentChild === child )
			return;

		if ( this.currentChild )
			this.element.removeChild( this.currentChild );

		this.currentChild = child;
		this.element.append( child );
	}

	onMouseMove( evt ) {
		if ( this.offset && this.currentChild ) {
			const newXPosition = evt.x - this.offset.x;
			const newYPosition = evt.y - this.offset.y;
			this.currentChild.style.left = `${newXPosition}px`;
			this.currentChild.style.top = `${newYPosition}px`;
		}
	}
}
