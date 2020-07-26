class ObjectRenderer {
	constructor( objectDescription, svg ) {
		this.svg = svg;
		this.objectDescription = objectDescription;
	}

	addToCanvas() {
		this.clippingRect = this.svg.rect( 50, 100 ).move( 50, 50 );
		this.rect = this.svg.rect( 50, 100 ).move( 50, 50 );
		this.rect.border( { width: 1, color: '#000' } );
		this.rect.fill( '#fff' );
	}
}
