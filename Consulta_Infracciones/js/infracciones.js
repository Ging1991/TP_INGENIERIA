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
 	$.ajax({
 		url: "https://infraccionesya.herokuapp.com/api/"+patente+"/infracciones/",
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
 * hace la request al server de un acarreo segun la patente y el id de infraccion
 */
function requestAcarreo(id) {
	$.ajax({
		url: "https://infraccionesya.herokuapp.com/api/"+patente+"/acarreos/"+id,
		contentType: "text/plain",
		success: function (datos) {
			mostrarMapaDep(datos);
		},
		error: function() { alert('Error en la respuesta de InfraccionesYa.'); }
	});
}


/*
 * agrega la infraccion a la tabla 
 */
 function muestraInfraccion(infraccion, index) {

 	if (typeof infraccion.id == 'undefined'){ 
		 return; 
	}

 	str = $("#cuerpo_tabla").html();

	var acarreo = "NO";

 	if (infraccion.existeAcarreo) { 
 		acarreo = "<a href='#'onclick='requestAcarreo("+infraccion.id+");'>SI</a>";
 	}
	
 	var t = 
 	$("#cuerpo_tabla").html( str +
 		"<tr>" +
 		"<td class='text-left'>" + infraccion.id + "</td>" +
		"<td class='text-left'>" + infraccion.direccionRegistrada + "</td>" +
 		"<td class='text-left'>" + buscaTipoInfraccion(infraccion.tipoInfraccion) + "</td>" +
 		"<td class='text-left'>" + infraccion.montoAPagar  + "</td>" +
		"<td class='text-left'>" + cambiarFecha(infraccion.fechaHoraRegistro) + "</td>" +
		"<td class='text-left'>" + cambiarFecha(infraccion.fechaHoraActualizacion) + "</td>" +
 		"<td class='text-left'>" + acarreo + " </td>" +
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
function mostrarMapaDep(datos){
	
	var latDep = datos.acarreo.deposito.ubicacion.lat;
	var lonDep = datos.acarreo.deposito.ubicacion.lon;

 // Ubicación de central del deposito
 var location = [latDep, lonDep];
 
 var map = L.map("mapa_dep");

 // Creación del componente mapa de Leaflet.
 map.setView(location, 15);

 // Agregamos los Layers de OpenStreetMap.
 var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 var myIcon = L.icon({
	iconUrl: 'img/deposito.png', 
	iconSize:[25,41],
 	iconAnchor:[12,41]
});

 var p = L.marker(L.latLng(latDep,
	lonDep),{icon: myIcon}).bindPopup(datos.acarreo.deposito.nombre +"<br>"+ datos.acarreo.deposito.direccion+
	"<br>"+datos.acarreo.deposito.telefono+"<br>"+datos.acarreo.deposito.horarios);
p.addTo(map);

}

function cambiarFecha(fecha){
 var res = fecha.substr(5,17);
 var res2 = res.replace(/ /g, "-");
 return res2;
}	

