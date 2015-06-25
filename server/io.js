/****** EL SERVIDOR *******/ 
var http = require("http"),
    PORT = 8081,
    HOST = "127.0.0.1";

var fs = require('fs');
/*
http.createServer(requestListener).listen(PORT,HOST,function(){
    console.log("Server en linea -> http://localhost" + ":" + PORT);
});
*/
http.createServer(requestListener).listen(PORT);


function requestListener(request, response){
    /*
        Obtenemos un arreglo con la informacion contenida en la peticion.
        Si en al final de la peticion escribimos /led/13/on
        obtendremos el arreglo ["led", "13", "on"]
    */
    console.log(__dirname);
    
    fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          response.writeHead(500);
          return response.end('Error loading index.html');
        }

        response.writeHead(200);
        response.end(data);
    });

    console.log(request.url.slice(1));
    var info = request.url.slice(1).split("/");

    if( info[0] === "digitalwrite" && info[1] > 0 && info[1] <= 26 && (info[2]=="1" || info[2]=="0")){
        var led = parseInt(info[1]);
        var state = info[2] == "1" ? true : false;
        // la funcion cambia el estado del led
        piMove(led,state);
        response.end("led " + led + " " + (state ? "encendido" : "apagado"));
    }else{
    //response.end("invalid request");
        console.log("index.html");
    }

}

/****** RaspberryPi GPIO *******/
var gpio = require("pi-gpio");

var ff = 11, rr = 12, bb = 16, ll = 15;
var x = 0;

gpio.open(ff, "output", function(err) {         // Open pin 16 for output
    gpio.write(ff, x, function() { console.log('Ping'); });
});

gpio.open(rr, "output", function(err) {
    gpio.write(rr, x, function() { console.log('Ping'); });
});

gpio.open(bb, "output", function(err) {
    gpio.write(bb, x, function() { console.log('Ping'); });
});

gpio.open(ll, "output", function(err) {
    gpio.write(ll, x, function() { console.log('Ping'); });
});

/*
setInterval(function(){
        gpio.write(ff, x, function() { console.log('Ping'); });
        x=!x;
}, 1000);
*/

// esta sera la funcion llamada por el server cuando las peticion sea correcta
function toggleLed(led, state){
    x=state;
    gpio.write(ff, x, function() { console.log('cambiando estado de Led:: ', x); });
}

function piMove(pin, state){
    x=state;
    gpio.write(pin, x, function() { console.log('cambiando estado de Led:: ', x); });
    x=0;
}