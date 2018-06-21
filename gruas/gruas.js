var bootstrap = function() {
	
	// BLOQUE 1: INICIALIZACION
	var mapa = crearMapa('mapaID');
    var dibujador = new Dibujador();
    var estados = traerEstados();
    var gruas = traerGruas();
    dibujador.dibujarEstados(estados, 'estados');
    console.log("BLOQUE 1: INICIALIZACION TERMINADA");
    
    
    // BLOQUE 2: CONFIGURAR GRUAS
    var agregarPosiciones = function (grua, estados){
    	grua.posiciones = traerPosiciones(grua.id);
    	grua.posiciones.forEach(function(posicion){
       		posicion.estado = estados[posicion.estado].descripcion;
       	});   	
    };

    var definirAvance = function(grua){
    	grua.posicionActual = 0;
    	grua.avanzar = function(){
    		if (grua.posicionActual == grua.posiciones.length-1)
    			grua.posicionActual = 0;
    		else
    			grua.posicionActual++;
    	};
    };

    var agregarGetters = function(grua){
    	grua.getLat = function(){
    		return grua.posiciones[grua.posicionActual].ubicacion.lat;
    	};
    	grua.getLon = function(){
    		return grua.posiciones[grua.posicionActual].ubicacion.lon;
    	};
    	grua.getEstado = function(){
    		return grua.posiciones[grua.posicionActual].estado;
    	};
    };

    // completo las gruas
    gruas.forEach( function(grua) {
    	grua.layer = null;
    	agregarPosiciones(grua, estados);
    	definirAvance(grua);
    	agregarGetters(grua);
    	delete grua.estado_id;
    	delete grua.ubicacion;
    
    });
    console.log("BLOQUE 2: CONFIGURAR GRUAS TERMINADA");
    
    // BLOQUE 3: CONFIGURAR DIBUJO
    var dibujarTodo = function() {
	    gruas.forEach(function(grua){
	    	grua.avanzar();
	    	dibujador.dibujarGrua(grua, mapa);
	    });
	};

    setInterval(dibujarTodo, 1000);
    console.log("BLOQUE 3: CONFIGURAR DIBUJO TERMINADO");
};

$(bootstrap);