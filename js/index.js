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
    swipePanel: 'left',
});
var $$ = Dom7;// Expose Internal DOM library
var mainView = myApp.addView('.view-main',{// Add main view
});
var logueado = localStorage.getItem("logueado");
var regId = localStorage.getItem("regId");
if(logueado === "si"){
    alert("logueado: " + logueado + " regId: " + regId);
    console.log(logueado);
    window.location.replace("home.html");
}
else if (logueado=== null&& regId===null){
    alert("logueado: "+logueado +" regId: "+regId);
    console.log(logueado);
    console.log(regId);
    window.location.replace("login.html");
}   
else if (logueado=== null && regId!=null){
    alert("logueado: "+logueado+ " regId: "+regId);
    console.log(logueado);
    window.location.replace("signup.html");
}
else if (logueado=== "no" && regId!=null){
    alert("logueado: "+logueado+ " regId: "+regId);
    console.log(logueado);
    window.location.replace("signup.html");
}else{
    alert("logueado: "+logueado +" regId: "+regId);
}