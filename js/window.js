class Window {
	constructor() {
		this.w = 100;
		this.h = 100;
		this.div = null;
		this.titleDiv = null;
		this.contentDiv = null;

		this._title = "Window";
		this._content = null;
		this.resizing = {
			x: 0,
			y: 0,
			resizing: false
		}
	}

	addToCanvas() {
		this.div = document.createElement( 'div' );
		this.div.className = 'window';
		this.div.style.top = '0px';
		this.div.style.left = '0px';
		this.div.style.width = '100px';
		this.div.style.height = '100px';

		this.titleDiv = document.createElement( 'div' );
		this.titleDiv.className = 'window-title';
		this.titleDiv.innerHTML = this.title;

		this.contentDiv = document.createElement( 'div' );
		this.contentDiv.className = 'window-content';
		this.contentDiv.innerHTML = this.content || '';

		this.resizeCorner = document.createElement( 'div' );
		this.resizeCorner.className = 'resize-corner';

		this.div.append( this.titleDiv );
		this.div.append( this.contentDiv );
		this.div.append( this.resizeCorner );

		/*
		this.resizeCorner.addEventListener( 'mousedown', evt => {
			evt.stopPropagation();
			this.resizeStart( evt );
		} );
		this.resizeCorner.addEventListener( 'mousemove', evt => {
			evt.stopPropagation();
			this._resizeFromCoords( evt );
		} );
		this.resizeCorner.addEventListener( 'mouseup', evt => {
			evt.stopPropagation();
			this.resizeStop();
		} );
		 */

		return this.div;
	}

	onMouseDown( point ) {
		this.resizeStart( point );
	}

	onMouseUp( point ) {
		this.resizeStop();
	}

	onMouseMove( point ) {
		this._resizeFromCoords( point );
	}

	resizeStart( { x, y } ) {
		this.resizing = {
			x,
			y,
			resizing: true
		};
	}

	resizeStop() {
		this.resizing.resizing = false;
	}

	get title() {
		return this._title;
	}

	set title( value ) {
		this._title = value;
		if ( this.titleDiv )
			this.titleDiv.innerHTML = value;
	}

	get content() {
		return this._content;
	}

	set content( value ) {
		this._content = value;
		if ( this.contentDiv )
			this.contentDiv.innerHTML = value;
	}

	moveTo( x = 0, y = 0 ) {
		this.x = x;
		this.y = y;
		this.div.style.left = `${x}px`;
		this.div.style.top = `${y}px`;
		return this;
	}

	_resizeFromCoords( { x, y } ) {
		if ( !this.resizing.resizing )
			return;
		const w = x - this.resizing.x;
		const h = y - this.resizing.y;


		const newWidth = this.w + w;
		const newHeight = this.h + h;

		console.log( `Resizing: ${newWidth}x${newHeight}` );

		if ( newWidth > 0 && newHeight > 0 )
			this.resize( newWidth, newHeight );
		else
			this.resize( 100, 100 );

		this.resizing.x = x;
		this.resizing.y = y;
	}


	resize( width, height ) {
		this.w = width;
		this.height = height;
		this.div.style.width = `${width}px`;
		this.div.style.height = `${height}px`;
	}
}
