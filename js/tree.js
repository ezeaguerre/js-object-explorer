class TreeIterationStatus {
	constructor() {
		this.keepGoing = cb => cb();
	}

	stop() {
		this.keepGoing = () => {};
	}

	go( callback ) {
		this.keepGoing( callback );
	}
}

class TopTreeNode {
	constructor( child ) { this.child = child; }
	get rootNode() { return this.child; }
	get itself() { return this.child; }
}

const TreeMixin = mixin( {
	initializeTree( maybeParent ) {
		this._parent = maybeParent || new TopTreeNode( this );
		this.children = [];
	},

	get parent() {
		return this._parent.itself;
	},

	get rootNode() {
		return this._parent.rootNode;
	},

	addChild( child ) {
		if ( this.children.contains( child ) )
			return this;
		child.removeFromParent();
		this.__becomeParentOf( child );
		child.addedToParent();
		return this;
	},

	removeChild( child ) {
		if ( this.children.remove( child ) ) {
			const oldParent = child._parent;
			child._parent = new TopTreeNode( child );
			child.removedFromParent( oldParent );
		}
		return this;
	},

	removeChildren() {
		while ( this.children.length > 0 )
			this.firstChild.removeFromParent();
		return this;
	},

	removeFromParent() {
		this.parent.removeChild( this );
		return this;
	},

	addToParent( parent ) {
		parent.addChild( this );
		return this;
	},

	__becomeParentOf( child ) {
		child._parent = this;
		this.children.push( child );
	},

	// Hooks (template methods)
	addedToParent() { },
	removedFromParent() { },

	forEachChild( callback ) {
		this.children.forEach( callback );
		return this;
	},

	forEachDescendant: function forEachDescendant( callback ) {
		return this.visitNodes( callback.skipFirst() );
	},

	visitNodes( callback, iterationStatus = new TreeIterationStatus() ) {
		iterationStatus.go( () => {
			callback( this, () => iterationStatus.stop() );

			return this.forEachChild( c =>
				c.visitNodes( callback, iterationStatus )
			);
		} );
	},

	findChild( predicate, { default: defaultValue = undefined } = {} ) {
		return this.children.findIfNone( predicate, defaultValue );
	},

	// Mainly utility functions to avoid children[ 0 ].children[ 1 ], etc
	get firstChild() { return this.children.first; },
	get secondChild() { return this.children.second; },
	get thirdChild() { return this.children.third; },
	get lastChild() { return this.children.last; },
	get childrenCount() { return this.children.length; }
} );

class Tree {
	constructor( maybeParent ) {
		this.initializeTree( maybeParent );
	}
}

TreeMixin.applyToClass( Tree );
