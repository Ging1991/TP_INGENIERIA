
var tipos_infraccion;
var patente;
/*
 * accion que se lleva a cabo cuando se da click al boton enviar en el 
 * formulario de partente, le da valor a la variable y carga en el
 * container correspondiente la tabla de infracciones
 */
 function submitPatente() {

 	patente = $("#patente").val();
 	$("#contenedor_infracciones").load("tablaInfracciones.html");

 }

/*
 * cancela la accion por defecto en el formulario de ingreso de
 * patente
 */
function onSubmitPatente() {

	$("#ingreso_patente").submit(function(e) {
		e.preventDefault();
	});
}

/*
 * funcion que se ejecula en el evento onload de
 * la tabla de infracciones
 */
function bootstrapTablaInfracciones() {
	requestTiposInfraccion();
}

/*
 * muestra el numero de patente en el titulo de la tabla
 */
 function muestraPatente(p) {
 	$("#titulo_tabla").html("PATENTE: "+p);
 }

/*
 * hace la request al server de los tipos de infracciones
 * existentes
 */
 function requestTiposInfraccion() {
 	$.ajax({
 		type: "GET",
 		url: "https://infraccionesya.herokuapp.com/api/tiposInfraccion",
 		contentType: "text/plain",
 		success: function (datos) {
			 tipos_infraccion = datos;
 			 requestInfracciones();
 		},
 		error: function() { alert('Error en la respuesta de InfraccionesYa.'); }
 	});
 }

/*
 * hace la request al server de las infracciones del numero de
 * patente ingresado en el formulario
 */
 function requestInfracciones() {

 	url = "https://infraccionesya.herokuapp.com/api/"+patente+"/infracciones/";

 	$.ajax({
 		type: "GET",
 		url: url,
 		contentType: "text/plain",
 		success: function (datos) { procesaInfracciones(datos);},
 		error: function() { alert('Error en la respuesta de InfraccionesYa.'); }
 	});
 }
 function procesaInfracciones(datos) {
	 if (datos.infracciones.length == 0) {
 		$("#pie_tabla_infracciones").html("La patente solicitada no posee infracciones");
 	}

 	muestraPatente(datos.patente);

 	datos.infracciones.forEach(muestraInfraccion);
 }

/*
 * agrega la infraccion a la tabla 
 */
 function muestraInfraccion(infraccion, index) {

 	if (typeof infraccion.id == 'undefined')  { return; }

 	str = $("#cuerpo_tabla").html();

 	/*var acarreo = "NO";

 	if (infraccion.existeAcarreo) { 
 		acarreo = "<a href='informacionAcarreo.html?id=" +
 		infraccion.id + 
 		"' target='_blank'>SI</a>";
 	}*/

 	var t = 
 	$("#cuerpo_tabla").html( str +
 		"<tr>" +
 		"<td class='text-left'>" + infraccion.id + "</td>" +
		"<td class='text-left'>" + infraccion.fechaHoraRegistro + "</td>" +
		"<td class='text-left'>" + infraccion.fechaHoraActualizacion + "</td>" +
 		"<td class='text-left'>" + infraccion.direccionRegistrada + "</td>" +
 		"<td class='text-left'>" + buscaTipoInfraccion(infraccion.tipoInfraccion) + "</td>" +
 		"<td class='text-left'>" + infraccion.montoAPagar  + "</td>" +
 		"<td class='text-left'>" + infraccion.existeAcarreo + " </td>" +
 		"</tr>"
 		);
 }

/*
 * dado un id de tipo de  infraccion retorna su descripcion
 */
function buscaTipoInfraccion(id) {

 	for (var i=0; i<tipos_infraccion.tipos.length; i++) {
		if (tipos_infraccion.tipos[i].id == id) {
			return tipos_infraccion.tipos[i].descripcion;
		}
 	}
 	
}
