/****** EL SERVIDOR *******/ 
var http = require("http"),
    PORT = 8081,
    HOST = "127.0.0.1";

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
var GPIO = require('onoff').Gpio;

var f = new GPIO(17, 'out'),
    r = new GPIO(18, 'out'),
    b = new GPIO(23, 'out'),
    l = new GPIO(22, 'out'),
    x = 0;


// esta sera la funcion llamada por el server cuando las peticion sea correcta
function toggleLed(led, state){
    x=state;
    f.writeSync(Number(state));
}

function piMove(pin, state){
    x=state;

    if(pin==11){
        f.writeSync(Number(x));
    }
    if(pin==12){
        r.writeSync(Number(x));
    }
    if(pin==15){
        l.writeSync(Number(x));
    }
    if(pin==16){
        b.writeSync(Number(x));
    }

    x=0;
}