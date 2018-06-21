var Race = function(name, map) {
    this.name = name;
    this.map = map;
    this.runnersData = [];

    this.addRunner = function(runner) {
        //Creamos el layer en el mapa para ese runner
        var runnerLayer = L.layerGroup().addTo(this.map);
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(runnerLayer, runner.name);

        var updater = function(newPosition) {
            console.log("Updating view for runner: " + runner.name + "!!");
            console.log(newPosition);

            // Opción 1.
            runnerLayer.addLayer(L.marker(newPosition).bindPopup(runner.name));
            // Opción 2.
            /*
			runnerLayer.addLayer(L.circleMarker(newPosition, {
                                     radius: 7,
                                     fillColor: runner.color,
                                     color: "#DDD",
                                     weight: 1,
                                     opacity: 1,
                                     fillOpacity: 0.3
                                 }));
			*/
        }

        this.runnersData.push({
            runner: runner,
            updater: updater
        })
    }

    this.start = function() {
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            runner.run(data.updater);
        });
    }
};