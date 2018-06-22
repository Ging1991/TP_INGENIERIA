
/*
 * inicializa las funciones del menu principal
 */
$(document).ready(function () {

	$("#menu_inicio").click(function () {
		$("body").load("index.html");
	});

	$("#menu_infraccion").click(function () {
		$("#contenido").load("infracciones.html");
	});

	$("#menu_deposito").click(function () {
		$("#contenido").load("mapa.html");
	});

});
