class Div {
	constructor() {
		this.children = [];
		this.style = {
			display: 'flex',
			flexDirection: 'column'
		}
	}

	append( child ) {
		this.children.push( child );
	}

	addToCanvas( canvas ) {
		const div = document.createElement( 'div' );

		const styles = Object.getOwnPropertyNames( this.style );
		styles.forEach( s => div.style[ s ] = this.style[ s ] );

		this.children.forEach( c => {
			const r = c.addToCanvas( div );
			div.append( r );
		} );

		return div;
	}
}
