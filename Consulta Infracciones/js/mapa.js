var map
/*
 * inicializa el mapa con todas las capas
 */
function bootstrap() {
	
 // Ubicación de la UNGS.
 var estacionLocation = [-34.543892, -58.713642];
 
 map = L.map("container");

 // Creación del componente mapa de Leaflet.
 map.setView(estacionLocation, 15);

 // Agregamos los Layers de OpenStreetMap.
 var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(map);

 // Agregamos el control para seleccionar Layers al mapa
 var layersControl = L.control.layers({
	 "Depositos": baseLayer
 });
 layersControl.addTo(map);

 requestDepositos();

}
$(bootstrap);

function requestDepositos(){
	url = "https://infraccionesya.herokuapp.com/api/depositos";

 	$.ajax({
 		type: "GET",
 		url: url,
 		contentType: "text/plain",
 		success: function (datos) { 
			 agregarDepositos(datos);},
 		error: function() { alert('Error en la respuesta de InfraccionesYa.'); }
 	});
}
function agregarDepositos(datos){
	for (var i=0; i<datos.depositos.length; i++) {
		var p = L.marker(L.latLng(datos.depositos[i].ubicacion.lat,
			datos.depositos[i].ubicacion.lon)).bindPopup(datos.depositos[i].nombre);
		p.addTo(map);
 	}
	
}

