
var app = {
    // Application Constructor
    initialize: function(){
        this.bindEvents();
    },
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function(){
        var push = PushNotification.init({
            "android": {"senderID": "400009158834"},
            "ios": {"alert":"true", "badge":"true", "sound":"true"},
            "windows": {} 
        });
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = data.registrationId;
            console.log(JSON.stringify(data));
        });
        
        push.on('notification', function(data){
            (new Media('tone.wav')).play();
            alert("desde");
            console.log("notification event");
            console.log(JSON.stringify(data));
            if(data.title=='Notificacion'){
                myApp.openPanel('right');
            }
            push.finish(function(){
                console.log('finish successfully called');
            });
        });
        push.on('error', function(e){
            console.log("push error");
            document.getElementById("regId").innerHTML = 'Error';
        });
    }
};
app.initialize();

$(document).ready(function(){
    $("#cargando").show();
    setTimeout(function(){
        $("#cargando").hide();
    },3000);
    setTimeout(function(){
        $("#views").show();
    },3000);
});
var myApp = new Framework7({// Init App
    modalTitle: 'Framework7',
    material: true,
    swipePanel: 'left',
});
var $$ = Dom7;// Expose Internal DOM library
var mainView = myApp.addView('.view-main', {// Add main view
});
var logueado = localStorage.getItem("logueado");
var regId = localStorage.getItem("regId");
if(logueado === "si"){
    console.log(logueado);
    window.location.replace("home.html");
}else if(logueado=== null && regId===null){
    console.log(logueado);
    console.log(regId);
    window.location.replace("login.html");
}else if(logueado=== null && regId!=null){
    console.log(logueado);
    window.location.replace("signup.html");
}else if(logueado=== "no" && regId!=null){
    console.log(logueado);
    window.location.replace("signup.html");
}
