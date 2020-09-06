class Window {
	constructor() {
		this.w = 100;
		this.h = 100;
		this.div = null;
		this.titleDiv = null;
		this.contentDiv = null;
		this.moving = false;
		this.x = 0;
		this.y = 0;

		this._title = 'Window';
		this._content = '';
		this.resizing = {
			x: 0,
			y: 0,
			resizing: false
		}

		this.subscriptions = new Subscriptions();
	}

	addToDesktop( desktop ) {
		const el = this.addToCanvas();

		this.subscriptions.addSubscriptions(
			desktop.listenTo( 'mousemove', evt => {
				if ( this.resizing.resizing ) {
					evt.stopPropagation();
					this._resizeFromCoords( evt );
				} else if ( this.moving ) {
					evt.stopPropagation();
					this.move( evt );
				}
			} ),
			desktop.listenTo( 'mouseup', evt => {
				if ( this.moving || this.resizing.resizing ) {
					evt.stopPropagation();
					this.resizeStop();
					this.stopMoving();
				}
			} )
		);

		this._updateContent();

		return el;
	}

	addToCanvas() {
		this.x = this.y = 0;

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

		this.resizeCorner = document.createElement( 'div' );
		this.resizeCorner.className = 'resize-corner';

		this.div.append( this.titleDiv );
		this.div.append( this.contentDiv );
		this.div.append( this.resizeCorner );

		this.resizeCorner.addEventListener( 'mousedown', evt => {
			evt.stopPropagation();
			this.resizeStart( evt );
		} );

		this.titleDiv.addEventListener( 'mousedown', evt => {
			evt.stopPropagation();
			this.startMoving( evt );
		} );

		return this.div;
	}

	acceptFocus() {
		return true;
	}

	resizeStart( { x, y } ) {
		this.resizing = {
			x,
			y,
			originalWidth: this.w,
			originalHeight: this.h,
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
		this._content = value || '';
		this._updateContent();
	}

	_updateContent() {
		const { content, contentDiv } = this;

		if ( !contentDiv )
			return;

		if ( typeof content !== 'object' ) {
			contentDiv.innerHTML = content.toString();
			return;
		}

		if ( content instanceof Element ) {
			if ( contentDiv.hasChildNodes() )
				contentDiv.replaceChild( content, contentDiv.firstChild );
			else
				contentDiv.append( content );
			return;
		}

		const element = content.addToCanvas( contentDiv );
		contentDiv.append( element );
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

		const newWidth = this.resizing.originalWidth + w;
		const newHeight = this.resizing.originalHeight + h;

		if ( newWidth > 0 && newHeight > 0 )
			this.resize( newWidth, newHeight );
		else
			this.resize( 100, 100 );
	}

	resize( width, height ) {
		this.w = width;
		this.h = height;
		this.div.style.width = `${width}px`;
		this.div.style.height = `${height}px`;
	}

	startMoving( { x, y })  {
		this.moving = true;
		this.movingOffset = {
			x: x - this.x,
			y: y - this.y
		};
	}

	stopMoving() {
		this.moving = false;
	}

	move( { x, y } ) {
		if ( this.moving ) {
			const newXPosition = x - this.movingOffset.x;
			const newYPosition = y - this.movingOffset.y;
			this.moveTo( newXPosition, newYPosition );
		}
	}

	grab() {
		this.startMoving( { x: this.x, y: this.y } );
	}
}
