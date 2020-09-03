class XXXX {
	constructor() {
		this.canvasElements = [];
		this.objects = [];
	}

	addObject( object ) {
		const child = object.addToCanvas( this.element );
		this.canvasElements.push( child );
		this.objects.push( object );
		return child;
	}

	ifElement( predicate, doBlock ) {
		const element = this.canvasElements.find( predicate );
		if ( element !== undefined )
			doBlock( element );
	}
}

const nullElement = {
	isInsideOf: () => false
};

HTMLElement.prototype.getParent = function getParent() {
	return this.parentElement || nullElement;
}

/**
 * NOTE: An element is inside of itself.
 */
HTMLElement.prototype.isInsideOf = function isInsideOf( anElement ) {
	return this === anElement || this.getParent().isInsideOf( anElement );
}

class ObjectDesktop {
	constructor( element ) {
		this.element = element;
		this.currentChild = null;
		this.children = new XXXX();
		this.offset = {};

		document.addEventListener( 'mousemove', evt => this.onMouseMove( evt ) );
		document.addEventListener( 'mouseup', evt => this.offset = null );
		document.addEventListener( 'mousedown', evt => {
			this.children.ifElement(
				e => evt.target.isInsideOf( e ),
				e => {
					this.offset = { x: evt.offsetX, y: evt.offsetY };
					this.focusOn( e );
				} );
		} );
	}

	addObject( object ) {
		const element = this.children.addObject( object );
		this.element.append( element );
	}

	focusOn( child ) {
		if ( this.currentChild === child )
			return;

		this.element.removeChild( child );
		this.element.append( child );
		this.currentChild = child;
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
