# TODO

 - [ ] Hacer una arquitectura consistente de composición de widgets
   - No haría falta manejar eventos.
	- Pero si composición de "addToCanvas"
	- Revisar "addToDesktop". Tiene sentido? Esto rompe un poco la composición? O es un caso especial solamente?
	  => En mi opinión rompe la coherencia de la composición, deberíamos buscar una manera de dar acceso a
	     `document` mediante una relación parent quizá, y entonces agregar registro de evento
		  en los componetnes.
 - [ ] Manejo de eventos: Roll your own? o vamos con los del DOM?
       Pensé que los elementos que tomaban paraban la fase de bubble, pero no es así,
		 por lo cual no estoy seguro qué podemos hacer con eso.
 - [ ] Cerrar ventanas.
 - [ ] Descripción de objetos: {nombre} - {tipo} - {valor} - {referencia}
 - [ ] Evaluador en contexto del objeto (texto y botones).
 - [ ] Obtener un objeto debajo del mouse.
 - [ ] Líneas de conexión entre objetos.
 - [ ] World Step
