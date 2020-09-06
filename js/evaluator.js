class Evaluator {
	constructor( context ) {
		this.textArea = null;
		this.context = context;
	}

	addToCanvas( canvas ) {
		let mainFrame = document.createElement( 'div' );
		mainFrame.style.display = 'flex';
		mainFrame.style.flexDirection = 'column';

		let buttonsFrame = document.createElement( 'div' );
		buttonsFrame.style.display = 'flex';
		buttonsFrame.style.flexDirection = 'row';

		let doItButton = document.createElement( 'button' );
		doItButton.innerText = 'Do It!';
		doItButton.addEventListener( 'click', () => this.doIt() );

		let getItButton = document.createElement( 'button' );
		getItButton.innerText = 'Get It!';
		getItButton.addEventListener( 'click', () => this.getIt() );

		buttonsFrame.appendChild( getItButton );
		buttonsFrame.appendChild( doItButton );

		this.textArea = document.createElement( 'textarea' );

		mainFrame.appendChild( this.textArea );
		mainFrame.appendChild( buttonsFrame );

		return mainFrame;
	}

	evaluate( text ) {
		let parts = text.split( ';' );
		parts = parts.filter( p => p.trim().length !== 0 );
		if ( parts.last.match( /^[\s]*return/ ) == null )
			parts.last = 'return ' + parts.last;

		let textToEvaluate = parts.join( ";" );
		textToEvaluate = `function doIt() {\n${textToEvaluate}\n}\ndoIt.call(this);`;

		return eval( textToEvaluate );
	}

	doIt() {
		const text = this.textArea.value;
		return this.evaluate.call( this.context, text );
	}

	getIt() {
		const value = this.doIt();
		window.desktop.addObject( value );
	}
}
