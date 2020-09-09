class Div extends Widget {
	constructor() {
		super();
		this.className = '';
		this.style = {
			display: 'flex',
			flexDirection: 'column'
		}
	}

	get innerHTML() {
		return this.canvas.innerHTML;
	}

	set innerHTML( value ) {
		this.canvas.innerHTML = value;
	}

	addEventListener( eventName, listener, useCapture ) {
		return this.canvas.addEventListener( eventName, listener, useCapture );
	}

	addedToParent() {
		const styles = Object.getOwnPropertyNames( this.style );
		styles.forEach( s => this.canvas.style[ s ] = this.style[ s ] );
		this.canvas.className = this.className;
		this.parent.canvas.append( this.canvas );
	}
}
