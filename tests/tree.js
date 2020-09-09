let lastId = 1;

function emptyTree( id ) {
	const tree = new Tree();
	tree.id = id || lastId;
	lastId++;
	return tree;
}

function treeWithChildren( ...children ) {
	const tree = emptyTree();
	if ( typeof children.first === 'string' )
		tree.id = children.shift();
	children.forEach( c => tree.addChild( c ) );
	return tree;
}

function exampleTree() {
	return treeWithChildren(
		treeWithChildren( 'first', emptyTree() ),
		treeWithChildren(
			'second',
			emptyTree(),
			treeWithChildren( 'stop-here', emptyTree() )
		),
		emptyTree( 'last' )
	);
}

describe( 'Tree', () => {
	beforeEach( () => lastId = 1 );

	describe( 'iteration', () => {
		it( 'can visit all direct children', () => {
			const tree = exampleTree();
			const visitedChildren = [];

			tree.forEachChild( c => visitedChildren.push( c ) );

			expect( visitedChildren.length ).toBe( 3 );
			expect( visitedChildren[ 0 ] ).toBe( tree.children[ 0 ] );
			expect( visitedChildren[ 1 ] ).toBe( tree.children[ 1 ] );
			expect( visitedChildren[ 2 ] ).toBe( tree.children[ 2 ] );
		} );

		it( 'can visit all children, direct and indirect', () => {
			const tree = exampleTree();
			const visitedChildren = [];

			tree.forEachDescendant( c => visitedChildren.push( c ) );

			expect( visitedChildren.length ).toBe( 7 );
			expect( visitedChildren[ 0 ] ).toBe( tree.children[ 0 ] );
			expect( visitedChildren[ 1 ] ).toBe( tree.children[ 0 ].children[ 0 ] );
			expect( visitedChildren[ 2 ] ).toBe( tree.children[ 1 ] );
			expect( visitedChildren[ 3 ] ).toBe( tree.children[ 1 ].children[ 0 ] );
			expect( visitedChildren[ 4 ] ).toBe( tree.children[ 1 ].children[ 1 ] );
			expect( visitedChildren[ 5 ] ).toBe( tree.children[ 1 ].children[ 1 ].children[ 0 ] );
			expect( visitedChildren[ 6 ] ).toBe( tree.children[ 2 ] );
		} );

		it( 'can be stopped (cuts)', () => {
			const tree = exampleTree();
			const visitedChildren = [];

			tree.forEachDescendant( ( c, stop ) => {
				visitedChildren.push( c )
				if ( c.id === 'stop-here' )
					stop();
			} );

			expect( visitedChildren.length ).toBe( 5 );
			expect( visitedChildren[ 0 ] ).toBe( tree.children[ 0 ] );
			expect( visitedChildren[ 1 ] ).toBe( tree.children[ 0 ].children[ 0 ] );
			expect( visitedChildren[ 2 ] ).toBe( tree.children[ 1 ] );
			expect( visitedChildren[ 3 ] ).toBe( tree.children[ 1 ].children[ 0 ] );
			expect( visitedChildren[ 4 ] ).toBe( tree.children[ 1 ].children[ 1 ] );
		} );
	} );

	describe( 'find', () => {
		it( 'can find specific child', () => {
			const tree = exampleTree();
			const found = tree.findChild( c => c.id === 'second' );
			expect( found ).toBe( tree.secondChild );
		} );

		it( 'may find nothing', () => {
			const found = exampleTree().findChild( c => c.id === 'adsf' );
			expect( found ).toBe( undefined );
		} );

		it( 'can be specified default value when not found', () => {
			const found = exampleTree().findChild(
				c => c.id === 'adsf',
				{ default: 'Not Found' }
			);
			expect( found ).toEqual( 'Not Found' );
		} );

		it( 'can be specified default closure when not found', () => {
			const found = exampleTree().findChild(
				c => c.id === 'adsf',
				{ default: () => 'Closure Not Found' }
			);
			expect( found ).toEqual( 'Closure Not Found' );
		} );
	} );

	describe( 'navigation', () => {
		it( 'can follow parent links', () => {
			const tree = exampleTree();
			const child = tree.secondChild.secondChild.firstChild;

			expect( child.parent ).toBe( tree.secondChild.secondChild );
			expect( child.parent.parent ).toBe( tree.secondChild );
			expect( child.parent.parent.parent ).toBe( tree );
		} );

		it( 'can go to the root', () => {
			const tree = exampleTree();
			const child = tree.secondChild.secondChild.firstChild;

			expect( child.rootNode ).toBe( tree );
		} );

		it( "can't go beyond the root node", () => {
			const tree = exampleTree();
			const child = tree.secondChild.secondChild.firstChild;

			expect( child.parent.parent.parent ).toBe( tree );
			expect( child.parent.parent.parent.parent ).toBe( tree );
			expect( child.parent.parent.parent.parent.parent ).toBe( tree );
		} );
	} );

	describe( 'addition', () => {
		it( 'adds a child to the parent', () => {
			let tree = emptyTree( 'root' );
			let child1 = emptyTree( 'child 1' );
			let child2 = emptyTree( 'child 2' );

			tree.addChild( child1 );
			tree.addChild( child2 );

			expect( tree.childrenCount ).toBe( 2 );
			expect( tree.firstChild ).toBe( child1 );
			expect( tree.secondChild ).toBe( child2 );
			expect( child1.parent ).toBe( tree );
			expect( child2.parent ).toBe( tree );
		} );

		it( 'removes a child from the old parent first', () => {
			let oldTree = emptyTree( 'old root' );
			let newTree = emptyTree( 'new root' );
			let child = emptyTree( 'child' );

			oldTree.addChild( child );
			expect( child.parent ).toBe( oldTree );
			expect( oldTree.childrenCount ).toBe( 1 );

			newTree.addChild( child );
			expect( child.parent ).toBe( newTree );
			expect( oldTree.childrenCount ).toBe( 0 );
		})
	} );

	describe( 'removal', () => {
		it ( 'removes from the parent', () => {
			const tree = treeWithChildren( 'root', emptyTree( 'child' ) );
			const child = tree.firstChild;

			child.removeFromParent();

			expect( tree.childrenCount ).toEqual( 0 );
			expect( child.parent ).toBe( child );
		} );
	} );

	describe( 'hooks', () => {
		it( 'can be specialized when added from parent', () => {
			const tree = emptyTree( 'root' );
			const child = emptyTree( 'child' );

			let addedTo = null;
			child.addedToParent = () => addedTo = child.parent;

			tree.addChild( child );
			expect( addedTo ).toEqual( tree );
		} );

		it( 'can be specialized when removed from parent', () => {
			const tree = emptyTree( 'root' );
			const child = emptyTree( 'child' );
			tree.addChild( child );

			let removedFrom = null;
			child.removedFromParent = oldParent => removedFrom = oldParent;

			tree.removeChild( child );

			expect( removedFrom ).toEqual( tree );
		} );
	} );
} );
