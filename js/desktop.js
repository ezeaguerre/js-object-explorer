class Desktop {
	constructor() {
		this.windows = [];

		this.currentWindow = null;
		this.currentDifference = { x: 0, y: 0 };

		document.addEventListener( 'mousemove', e => this.mouseMove( e ) );
		document.addEventListener( 'mouseup', e => this.mouseUp( e ) );
	}

	createWindow( windowTitle, windowContent ) {
		const window = new Window( document );
		window.initialize();

		if ( windowTitle )
			window.title = windowTitle;

		if ( windowContent )
			window.content = windowContent;

		this.addWindow( window );

		return window;
	}

	addWindow( window ) {
		this.windows.push( window );

		window.addMouseDownEventListener(
			(w, s, o) => this.pressedWindowTitle(w, s, o) );
	}

	pressedWindowTitle( window, difference ) {
		console.log( 'Pressed Window' );
		this.currentWindow = window;
		this.currentDifference = difference;
	}

	mouseUp( evt ) {
		this.currentWindow = null;
	}

	mouseMove( e ) {
		if ( this.currentWindow )
			this.currentWindow.moveTo(
				e.x - this.currentDifference.x,
				e.y - this.currentDifference.y
			);
	}
}
