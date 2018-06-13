var crearMapa = function(nodoID) {
    var ubicacionUNGS = [-34.5221554, -58.7000067];
    var mapa = L.map(nodoID).setView(ubicacionUNGS, 13);

    // AGREGO COMO CAPA BASE OPEN STREET MAP
    var capaBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // AGREGO EL CONTROL PARA SELECCIONAR CAPAS
    var controlCapas = L.control.layers({
        "BASE": capaBase
    });
    controlCapas.addTo(mapa);
    mapa.controlCapas = controlCapas;

    return mapa;
};

var limpiarMapa = function (mapa) {
	mapa.eachLayer(function (layer) {
	    mapa.removeLayer(layer);
	});
};