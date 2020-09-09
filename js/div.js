class Div extends Widget {
	constructor() {
		super();
		this.className = '';
		this.style = {
			display: 'flex',
			flexDirection: 'column'
		}
	}

	addedToParent() {
		const styles = Object.getOwnPropertyNames( this.style );
		styles.forEach( s => this.canvas.style[ s ] = this.style[ s ] );
		this.canvas.className = this.className;
		this.parent.canvas.append( this.canvas );
	}
}
