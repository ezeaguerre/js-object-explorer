class Window {
	constructor( document ) {
		this.dom = document;
		this.x = this.y = 0;
		this.w = this.h = 100;

		this.div = null;
		this.titleDiv = null;
		this.contentDiv = null;

		this.mouseDownListeners = [];
	}

	initialize() {
		this.div = this.dom.createElement( 'div' );
		this.div.className = 'window';
		this.div.style.top = '0px';
		this.div.style.left = '0px';
		this.div.style.width = '100px';
		this.div.style.height = '100px';

		this.titleDiv = this.dom.createElement( 'div' );
		this.titleDiv.className = 'window-title';
		this.titleDiv.innerHTML = 'Window';

		this.contentDiv = this.dom.createElement( 'div' );
		this.contentDiv.className = 'window-content';
		this.contentDiv.innerHTML = 'Contenido de la ventana :-) Es bastante largo, así que un poco de overflow: scroll nos viene bien para poder ver todo :-)';

		this.div.append( this.titleDiv );
		this.div.append( this.contentDiv );

		this.dom.body.append( this.div );

		this.titleDiv.addEventListener( 'mousedown', evt => this.mouseDown( evt ) );

		return this;
	}

	get title() {
		return this.titleDiv.innerHTML;
	}

	set title( value ) {
		this.titleDiv.innerHTML = value;
	}

	get content() {
		return this.contentDiv.innerHTML;
	}

	set content( value ) {
		this.contentDiv.innerHTML = value;
	}

	moveTo( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
		this.div.style.left = `${x}px`;
		this.div.style.top = `${y}px`;
		return this;
	}

	move( x = 0, y = 0 ) {
		return this.moveTo( this.x + x, this.y + y );
	}

	resize( width, height ) {
		this.w = width;
		this.height = height;
		this.div.style.width = `${width}px`;
		this.div.style.height = `${height}px`;
	}

	mouseDown( evt ) {
		const difference = {
			x: evt.offsetX,
			y: evt.offsetY
		};

		this.mouseDownListeners.forEach( l => l( this, difference ) );

		this.bringToFront();
	}

	addMouseDownEventListener( listener ) {
		this.mouseDownListeners.push( listener );
	}

	bringToFront() {
		document.body.removeChild( this.div );
		document.body.appendChild( this.div );
	}
}
