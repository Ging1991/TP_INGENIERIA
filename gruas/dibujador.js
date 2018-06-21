var iconoDeposito = L.icon({
	iconUrl:'imagenes/deposito.png',
	iconSize:[25, 41],
	iconAnchor:[12, 41]
});

var iconoDisponible = L.icon({
	iconUrl:'imagenes/estado_disponible.png',
	iconSize:[25, 41],
	iconAnchor:[12, 41]
});

var iconoNoDisponible = L.icon({
	iconUrl:'imagenes/estado_no_disponible.png',
	iconSize:[25, 41],
	iconAnchor:[12, 41]
});

var iconoEnViaje = L.icon({
	iconUrl:'imagenes/estado_en_viaje.png',
	iconSize:[25, 41],
	iconAnchor:[12, 41]
});

var iconos = [iconoDisponible, iconoNoDisponible, iconoEnViaje];

var Dibujador = function() {
    
	return {
    	dibujarGrua: dibujarGrua,
        dibujarEstados: dibujarEstados,
        dibujarDeposito:dibujarDeposito
    }

    function dibujarEstados(estados, ID) {  
		estados.forEach(function(estado) {
            var li = $('<li>');
            li.append(estado.descripcion);
            $("#"+ID).append(li);
        });
    }

    function dibujarGrua(grua, mapa) {
    	if (grua.layer != null) {
			mapa.removeLayer(grua.layer);
		}
    	var icono = iconos[grua.getEstadoID()];
    	grua.layer = L.marker(L.latLng(grua.getLat(), grua.getLon()), {icon:icono});
    	grua.layer.bindPopup(grua.getEstado());
		grua.layer.addTo(mapa);
	}
    
    function dibujarDeposito(deposito, mapa) {
    	var layer = L.marker(L.latLng(deposito.ubicacion.lat, deposito.ubicacion.lon), {icon:iconoDeposito});
    	layer.bindPopup(deposito.nombre);
		layer.addTo(mapa);
    }
}