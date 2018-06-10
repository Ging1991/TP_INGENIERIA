var Drawer = function() {
    return {
        drawTowTruckInMap: drawTowTruckInMap,
        drawStatesInList: drawStatesInList
    }

    /******************************************************************************
     * Función para dibujar una grua en un mapa.
     */
    function drawTowTruckInMap(grua, map) {
        console.log("Dibujando la grua: " + grua.id);

		var info = grua.estado.descripcion;
		
		// Creamos un marker.		
		var p = L.marker(L.latLng(grua.ubicacion.lat, grua.ubicacion.lon))
			.bindPopup(info);

		p.addTo(map);		
	}

    /******************************************************************************
     * Función para listar los estados en la página.
     */
    function drawStatesInList(estados, nodeId) {        
		estados.forEach(function(estado) {
            var li = $('<li>');
            li.append(estado.descripcion);
            $("#"+nodeId).append(li);
        });
    }
}
