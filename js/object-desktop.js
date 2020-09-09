
/**
 * NOTE: An element is inside of itself.
 */
HTMLElement.prototype.isInsideOf = function isInsideOf( anElement ) {
	return this === anElement || this.getParent().isInsideOf( anElement );
}

class ObjectDesktop extends Widget {
	constructor( element ) {
		super();
		this.canvas = element;
		this.currentChild = null;
		this.cursorPosition = { x: 0, y: 0 };
		this.allObjects = []; // NOTA: Se podría cambiar usando forEachDescendant

		document.addEventListener( 'mousedown', evt => {
			const child = this.findChild( c => evt.target.isInsideOf( c.canvas ) )
			if ( child )
				this.focusOn( child );
		} );

		document.addEventListener( 'mousemove', ( { x, y } ) => {
			this.cursorPosition = { x, y };
		} );

		setInterval(
			() => this.forEachChild( c => c.worldStep( 1000 ) ),
			1000
		);
	}

	removeChild( child ) {
		this.allObjects.remove( ( { window } ) => window === child );
		return super.removeChild( child );
	}

	addWindow( window ) {
		this.addChild( window );
	}

	addObject( object ) {
		for( let o of this.allObjects ) {
			if ( o.object === object ) {
				this.focusOn( o.window );
				o.window.moveTo( this.cursorPosition.x, this.cursorPosition.y );
				o.window.grab();
				return;
			}
		}

		const window = new Window();
		window.title = 'An Object';

		if ( object === null )
			window.title = 'Null';
		else if ( object === undefined )
			window.title = 'Undefined';
		else {
			const proto = Object.getPrototypeOf( object );
			if ( proto && proto.constructor && proto.constructor.name )
				window.title = proto.constructor.name.articulize();
			else if ( object.constructor && object.constructor.name )
				window.title = object.constructor.name.articulize();
		}

		const content = new Div();
		content.style.flex = 1;

		content.addChild( Object.describeWithWidget( object ) );
		content.addChild( new Evaluator( object ) );

		content.firstChild.canvas.style.flex = 1;

		window.setContent( content );

		this.addWindow( window );
		window.resize( 200, 200 );

		this.allObjects.push( {
			window, object
		} );
	}

	focusOn( child ) {
		if ( this.currentChild === child )
			return true;

		if ( !child.acceptFocus() )
			return false;

		this.canvas.removeChild( child.canvas );
		this.canvas.append( child.canvas );
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
