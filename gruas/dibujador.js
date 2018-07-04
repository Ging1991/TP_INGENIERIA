var getColor = function (color) {
	if (color == 1)
		return 'red';
	
	if(color== 2)
		return 'yellow';
	
	return 'green';
}

var iconoDeposito = L.icon({
	iconUrl:'imagenes/deposito.png',
	iconSize:[50, 41],
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

var iconos = [iconoDisponible, iconoEnViaje, iconoNoDisponible];

var Dibujador = function() {
    
	return {
    	dibujarGrua: dibujarGrua,
        dibujarEstados: dibujarEstados,
        dibujarDeposito:dibujarDeposito
    }

    function dibujarEstados(mapa) {
        var legend = L.control({position : 'bottomleft'});
        legend.onAdd = function(map){
        	var div = L.DomUtil.create('div', 'legend');
        	var estados = ["No operativa", "En viaje", "Libre"];
        	var colores = [1, 2, 0];
        	div.innerHTML = '<div><b>Estados</b></div>';

        	for(var i = 0; i < colores.length; i++){
        		div.innerHTML += '<i style="background:' 
        			+ getColor(colores[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
        			+ estados[i] + '<br />';
    			}
    			return div;
    		}
        
    legend.addTo(mapa);

    	
    	/*
		estados.forEach(function(estado) {
            var li = $('<li>');
            li.append(estado.descripcion);
            $("#"+ID).append(li);
        });
        */
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
