/*window.onload = function() {
	window.desktop = new Desktop();

	window.desktop
		.createWindow()
		.moveTo( 100, 100 );

	window.desktop
		.createWindow( 'Calculadora', 'Esta ventana calcula cosas, como 2 + 2 = 4' )
		.moveTo( 5, 5 );

	window.desktop
		.createWindow( 'Documento', 'Esta ventana es un documento :-O')
		.moveTo( 250, 50 );
};
*/

window.onload = () => {
	window.desktop = new ObjectDesktop( document.body );
	window.desktop.addObject( window );
};
