class Window extends Widget {
	constructor() {
		super();

		this.w = 100;
		this.h = 100;
		this.div = this.canvas;
		this.titleDiv = new Div();
		this.contentDiv = new Div();
		this.resizeCorner = new Div();
		this.moving = false;
		this.x = 0;
		this.y = 0;

		this._title = 'Window';
		this.resizing = {
			x: 0,
			y: 0,
			resizing: false
		}

		this.subscriptions = new Subscriptions();
	}

	addedToParent() {
		const el = this._addToCanvas( this.parent.canvas );

		this.subscriptions.addSubscriptions(
			this.rootWidget.listenTo( 'mousemove', evt => {
				if ( this.resizing.resizing ) {
					evt.stopPropagation();
					this._resizeFromCoords( evt );
				} else if ( this.moving ) {
					evt.stopPropagation();
					this.move( evt );
				}
			} ),
			this.rootWidget.listenTo( 'mouseup', evt => {
				if ( this.moving || this.resizing.resizing ) {
					evt.stopPropagation();
					this.resizeStop();
					this.stopMoving();
				}
			} )
		);

		return el;
	}

	_addToCanvas( canvas ) {
		this.x = this.y = 0;

		this.canvas.className = 'window';
		this.canvas.style.top = '0px';
		this.canvas.style.left = '0px';
		this.canvas.style.width = '100px';
		this.canvas.style.height = '100px';

		this.titleDiv.className = 'window-title';
		this.titleDiv.canvas.innerHTML = this.title;

		this.contentDiv.className = 'window-content';

		this.resizeCorner.className = 'resize-corner';

		this.addChild( this.titleDiv );
		this.addChild( this.contentDiv );
		this.addChild( this.resizeCorner );

		this.resizeCorner.canvas.addEventListener( 'mousedown', evt => {
			evt.stopPropagation();
			this.resizeStart( evt );
		} );

		this.titleDiv.canvas.addEventListener( 'mousedown', evt => {
			evt.stopPropagation();
			this.startMoving( evt );
		} );

		canvas.append( this.div );
	}

	setContent( content ) {
		this.contentDiv.removeChildren();
		this.contentDiv.addChild( content );
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
