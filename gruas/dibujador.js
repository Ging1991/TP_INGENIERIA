var Dibujador = function() {
    
	return {
    	dibujarGrua: dibujarGrua,
        dibujarEstados: dibujarEstados
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
    	
    	grua.layer = L.marker(L.latLng(grua.getLat(), grua.getLon()));
    	grua.layer.bindPopup(grua.getEstado());
		grua.layer.addTo(mapa);
	}
}