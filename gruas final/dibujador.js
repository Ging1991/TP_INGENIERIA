var Dibujador = function() {
    
	return {
    	dibujarGrua: dibujarGrua,
        dibujarEstados: dibujarEstados
    }

    function dibujarGrua(grua, mapa) {
    	var dato = grua.getEstado();
		var punto = L.marker(L.latLng(grua.getLat(), grua.getLon()))
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