var callAsincronico = function (url, callback) {
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

var callSincronico = function (url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    if (xhttp.status === 200) {
        var resObj = JSON.parse(xhttp.responseText)
        return resObj;
    }
    return null;
}

var urlEstados = Config.api + Config.estados;
var urlGruas = Config.api + Config.gruas;
var urlDepositos = Config.api + Config.depositos;
var vacio = function(){};


var traerEstados = function() {
	var estados = callSincronico (urlEstados, vacio);
    estados = estados.estados;
    return estados;
};

var traerGruas = function() {
    var gruas = callSincronico (urlGruas, vacio);
    gruas = gruas.gruas;
    return gruas;
};

var traerPosiciones = function(gruaID) {
	var posiciones = callSincronico (urlGruas + gruaID + Config.posiciones, vacio);
	posiciones = posiciones.posiciones;
	return posiciones;
};

var traerDepositos = function() {
	var depositos = callSincronico (urlDepositos, vacio);
	depositos = depositos.depositos;
	return depositos;
};