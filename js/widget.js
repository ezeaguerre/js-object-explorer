const WidgetMixin = mixin( {
	initializeWidget( maybeParent ) {
		this.initializeTree( maybeParent );
		this.canvas = document.createElement( 'div' );
	},

	// NOTA: Ver como este mixin tiene 2 palabras para lo mismo:
	//  - rootWidget
	//  - rootNode
	// NOTA: Eiffel soporta renaming
	get rootWidget() { return this.rootNode; },

	addedToParent() {
		this.parent.canvas.append( this.canvas );
	},

	removedFromParent( oldParent ) {
		oldParent.canvas.removeChild( this.canvas );
	},

	worldStep( milliseconds ) {
		this.forEachChild( c => c.worldStep( milliseconds ) );
	},

	acceptFocus() {
		return true;
	}
} );

TreeMixin.applyToMixin( WidgetMixin );

class Widget {
	constructor( maybeParent ) {
		this.initializeWidget( maybeParent );
	}
}

WidgetMixin.applyToClass( Widget );
