class DesktopChildren {
	constructor() {
		this.children = [];
	}

	addObjectToDesktop( object, desktop ) {
		const element = object.addToDesktop( desktop );
		this.children.push( {
			element,
			object
		} );
		desktop.append( element );
	}

	ifChild( predicate, doBlock ) {
		const child = this.children.find( predicate );
		if ( child )
			doBlock( child );
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
		this.canvas = element;
		this.currentChild = null;
		this.children = new DesktopChildren();
		this.offset = {};

		document.addEventListener( 'mousedown', evt =>
			this.children.ifChild(
				c => evt.target.isInsideOf( c.element ),
				c => this.focusOn( c )
			)
		);
	}

	addWindow( window ) {
		return this.children.addObjectToDesktop( window, this );
	}

	addObject( object ) {
		const window = new Window();
		window.title = 'An Object';
		window.content = new ObjectDescription( object );

		this.addWindow( window );
	}

	focusOn( child ) {
		if ( this.currentChild === child )
			return true;

		if ( !child.object.acceptFocus() )
			return false;

		this.canvas.removeChild( child.element );
		this.canvas.append( child.element );
		this.currentChild = child;
		return true;
	}

	listenTo( eventName, handler, options ) {
		return EventSubscription.subscribeOn( document, eventName, handler, options );
	}

	append( element ) {
		this.canvas.append( element );
		return this;
	}
}
