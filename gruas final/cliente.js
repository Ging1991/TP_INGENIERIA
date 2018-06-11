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
    console.log("Bloque de inicializacion terminado");
    
    // BLOQUE DE AGREGAR FUNCIONES
    var traerGruas = function(estados) {
        return $.ajax(urlGruas);
    }
    var dibujarGrua = function(grua) {
		dibujador.dibujarGrua(grua, mapa);
    }
    var extraerEstado = function(id) {
    	return estados.estados[id].descripcion;
    }
    var agregarEstado = function(grua) {
    	grua.estado = extraerEstado (grua.estado_id); 
    };
    
	var dibujarTodo = function(gruas) {
    	gruas.forEach (function(grua){
    		agregarEstado(grua);
    		dibujarGrua(grua);
    	});
    }
    
	// DIBUJO TODAS LAS GRUAS
	traerGruas()
		.then(dibujarTodo)
		.done(function() {
            console.log("Bloque mostrar grua terminado");
        });

};

$(bootstrap);