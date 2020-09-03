const DesktopChildMixin = mixin( {
	addToDesktop( desktop ) {
		return this.addToCanvas( desktop.canvas );
	},

	acceptFocus() {
		return true;
	}
} );
