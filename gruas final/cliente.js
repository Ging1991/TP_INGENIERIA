// CALL ASINCRONICO
var asyncQuery = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                resObj = JSON.parse(xhttp.responseText)
                callback(resObj);
            }
        }
    };
    xhttp.open("GET", url, true);
    var ret = xhttp.send();
    return ret;
}

// CALL SINCRONICO
var syncQuery = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    if (xhttp.status === 200) {
        var resObj = JSON.parse(xhttp.responseText)
        return resObj;
    }
    return null;
}

// FUNCION INICIAL
var bootstrap = function() {
	// BLOQUE DE INICIALIZACION
	var urlGruas = Config.api + Config.gruas;
	var urlEstados = Config.api + Config.estados;
	
	var mapa = crearMapa('mapaID');
    var dibujador = new Dibujador();
    var nada = function() {};
    
    var estados = syncQuery (urlEstados, nada);
    estados = estados.estados;
    var gruas = syncQuery (urlGruas, nada);
    gruas = gruas.gruas;
    console.log("Inicializacion terminada");
    
    
    // BLOQUE DE MODELADOS DE GRUAS
    var traerPosiciones = function(grua){
    	grua.posiciones = syncQuery (urlGruas + grua.id + Config.posiciones, nada);
    	grua.posiciones = grua.posiciones.posiciones;    	
    };

    var completarEstado = function(grua) {
    	grua.posiciones.forEach(function(posicion){
       		posicion.estado = estados[posicion.estado].descripcion;
       	});   	
    };
    
    var definirAvance = function(grua){
    	grua.actual = 0;
    	grua.avanzar = function(){
    		if (grua.actual == grua.posiciones.length-1)
    			grua.actual = 0;
    		else
    			grua.actual++;
    	};
    };
    
    var agregarGetters = function(grua){
    	grua.getLat = function(){
    		return grua.posiciones[grua.actual].ubicacion.lat;
    	};
    	grua.getLon = function(){
    		return grua.posiciones[grua.actual].ubicacion.lon;
    	};
    	grua.getEstado = function(){
    		return grua.posiciones[grua.actual].estado;
    	};
    };
    
    
    gruas.forEach( function(grua) {
    	
    	traerPosiciones(grua);
    	completarEstado(grua);
    	definirAvance(grua);
    	agregarGetters(grua);
       	
    	delete grua.estado_id;
    	delete grua.ubicacion;
    });
    
    console.log("Modelado de gruas terminado");
    
    
    // BLOQUE DE DEFINICION DE DIBUJO
	var dibujarTodo = function() {
		//limpiarMapa(mapa);

	    gruas.forEach(function(grua){
	    	grua.avanzar();
	    	//console.log("dibujando grua:"+grua.id);
			dibujador.dibujarGrua(grua, mapa);
	    });
	};
	
	setInterval(dibujarTodo, 1000);
    console.log("Bloque de definicion de dibujo terminado");
    
};

$(bootstrap);