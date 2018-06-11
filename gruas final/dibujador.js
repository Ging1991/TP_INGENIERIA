var Dibujador = function() {
    
	return {
    	dibujarGrua: dibujarGrua,
        dibujarEstados: dibujarEstados
    }

    function dibujarGrua(grua, mapa) {
		//var dato = grua.estado.descripcion;
    	var dato = grua.estado;
		var punto = L.marker(L.latLng(grua.ubicacion.lat, grua.ubicacion.lon))
			.bindPopup(dato);
		punto.addTo(mapa);		
	}

    function dibujarEstados(estados, ID) {  
		estados.forEach(function(estado) {
            var li = $('<li>');
            li.append(estado.descripcion);
            $("#"+ID).append(li);
        });
    }
}
