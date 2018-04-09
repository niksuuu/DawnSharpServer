var net = require("net");
var colors = require("colors");
var server = net.createServer();
var mongoose = require("mongoose");
var port = 1456;
var isServerActive = true;

server.on("connection",function(socket){

var connAdress = socket.remoteAddress + ":" + socket.remotePort;
console.log("New Client Connected : ".green,connAdress);

socket.on("data",function(dataObject){
    var jsonString = JSON.parse(dataObject);
    console.log("Data from %s: %s ".green,connAdress,dataObject);
    if(jsonString.Command == "Login")
    {
           if(jsonString.Username == "neafle" && jsonString.Password == "emreli2001"){
            var mystring = "{\"Login\":\"True\",\"Token\":\"14562001\",\"Username\":\"" + jsonString.Username + "\"}";
            socket.write(mystring);
           }else{
                var mystring = "{\"Login\":\"False\"}";
                socket.write(mystring);
           }
            

       
            
    }
    if(jsonString.Command == "GetServerState")
    {
        if(isServerActive == false)
        {
            socket.write("{\"ServerState\":\"Down\"}")
        }
        if(isServerActive == true)
        {
            socket.write("{\"ServerStatu\":\"Up\"}")
        }
    }
})

socket.once("close",function(){
console.log("Disconnect from %s ".red,connAdress);
});

socket.on("error",function(err){
console.log("Error: ".red + err);
});

});



server.listen(port,function(){
    console.log("Server running on " + port);
});



