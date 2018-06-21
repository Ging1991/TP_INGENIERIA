
function bootstrap() {

    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('mapid').setView(ungsLocation, 15);

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);
    // hack:
    map.layersControl = layersControl;

    // Creamos un círculo con centro en la UNGS.
    var circle = L.circle(ungsLocation, {
        color: '#0000AA',
        fillColor: '#0000CC',
        fillOpacity: 0.2,
        radius: 300
    }).addTo(map);

    // Creamos un polígono.
    L.polygon([
        L.latLng(-34.515594, -58.705654),
        L.latLng(-34.523503, -58.714062),
        L.latLng(-34.519177, -58.719890),
        L.latLng(-34.511089, -58.711374),
        L.latLng(-34.514062, -58.707909),
        L.latLng(-34.513824, -58.707584),
    ]).addTo(map);

    // Creamos un marker sobre la UNGS.
    var ungsMarker = L.marker(ungsLocation);
    ungsMarker.addTo(map);

    // Creamos una carrera
    var race1K = new Race("1K", map);

	// Pietro!	
    var pietro = new Runner("Maximoff Pietro", 'blue', [
		{lat: -34.524309, lon: -58.695315},
		{lat: -34.524048, lon: -58.695630},
		{lat: -34.523720, lon: -58.696011},
		{lat: -34.523464, lon: -58.696311},
		{lat: -34.523076, lon: -58.696773},
		{lat: -34.522426, lon: -58.697540},
		{lat: -34.522420, lon: -58.697544},
		{lat: -34.522102, lon: -58.697934},
		{lat: -34.521860, lon: -58.698216},
		{lat: -34.521464, lon: -58.698688}
        ]);
	//
    race1K.addRunner(pietro);

	// Barry!
    var barry = new Runner("Bartholomew Allen", 'red', [
		{lat: -34.524309, lon: -58.695315},
		{lat: -34.524105, lon: -58.695573},
		{lat: -34.523739, lon: -58.695986},
		{lat: -34.523371, lon: -58.696419},
		{lat: -34.523371, lon: -58.696419},
		{lat: -34.523371, lon: -58.696419},
		{lat: -34.523371, lon: -58.696419},
		{lat: -34.523371, lon: -58.696419},
		{lat: -34.523371, lon: -58.696419},	
		{lat: -34.523371, lon: -58.696419}	
        ]);
    //
    race1K.addRunner(barry);
	
    // Bolt!
    var bolt = new Runner("Usain Bolt", 'green', [
		{lat: -34.524309, lon: -58.695315},
		{lat: -34.524085, lon: -58.695596},
		{lat: -34.523832, lon: -58.695882},
		{lat: -34.523431, lon: -58.696354},
		{lat: -34.523107, lon: -58.696740},
		{lat: -34.522747, lon: -58.697168},
		{lat: -34.522540, lon: -58.697409},
		{lat: -34.522162, lon: -58.697866},
		{lat: -34.521860, lon: -58.698216},
		{lat: -34.521390, lon: -58.698780}
        ]);
    //
    race1K.addRunner(bolt);

    // START!
    race1K.start();
}

$(bootstrap);