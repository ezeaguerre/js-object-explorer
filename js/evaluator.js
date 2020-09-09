class Evaluator extends Widget {
	constructor( context ) {
		super();
		this.textArea = document.createElement( 'textarea' );
		this.context = context;
		this.setupCanvas();
	}

	setupCanvas() {
		let mainFrame = this.canvas;
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

		let printItButton = document.createElement( 'button' );
		printItButton.innerText = 'Print It!';
		printItButton.addEventListener( 'click', () => this.printIt() );

		buttonsFrame.appendChild( getItButton );
		buttonsFrame.appendChild( doItButton );
		buttonsFrame.appendChild( printItButton );

		mainFrame.appendChild( this.textArea );
		mainFrame.appendChild( buttonsFrame );


		this.textArea.addEventListener( 'keydown', e => {
			if ( e.ctrlKey ) {
				switch( e.key ) {
					case 'd': this.doIt(); break;
					case 'g': this.getIt(); break;
					case 'p': this.printIt(); break;
					default: return;
				}
				e.preventDefault();
				e.stopPropagation();
			}
		} );
	}

	evaluate( text ) {
		let parts = text.split( ';' );
		parts = parts.map( p => p.trim() ).filter( p => p.length !== 0 );
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
		this.rootWidget.addObject( value );
		this.rootWidget.addObject( value );
	}

	printIt() {
		const previousLength = this.textArea.value.length;
		this.textArea.value = this.textArea.value + ' => ' + Object.printString( this.doIt() );
		this.textArea.selectionStart = previousLength;
	}
}
