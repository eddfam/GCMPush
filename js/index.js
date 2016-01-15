$(document).ready(function ( ) {
    
    $("#cargando").show();
    setTimeout(function() {
        $("#cargando").hide();
    },3000);
    setTimeout(function(){
        $("#views").show();
    },3000);
    
    
});
// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
    swipePanel: 'left',
});

// Expose Internal DOM library
var $$ = Dom7;


// Add main view
var mainView = myApp.addView('.view-main', {
});

var logueado = localStorage.getItem("logueado");
var regId = localStorage.getItem("regId");

if(logueado === "si")
    {
        console.log(logueado);
         window.location.replace("home.html");
    }
else if (logueado=== null && regId===null)
    {
        console.log(logueado);
        console.log(regId);
        window.location.replace("login.html");
    }
else if (logueado=== "no" && regId!=null)
    {
        alert("logueado: "+logueado+ " regId: "+regId);
        console.log(logueado);
        window.location.replace("signup.html");
    }
else if (logueado=== null && regId!=null)
    {
        console.log(logueado);
        window.location.replace("signup.html");
    }
$("#login-button").click(function(event){
            event.preventDefault();
	        var email = $("#email").val();
            var password =$("#password").val();
            function validateEmail(email) { 
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
            
             if(email==''||email==undefined){
                 return alert('Ingrese su correo electronico');
             }else if (!validateEmail(email)) {
                 return alert('Correo electronico no valido');
             }else if(password==''||password==undefined){
                 return alert('Ingrese una contraseña valida');
             }else{
                 console.log(window.localStorage.getItem("regId"));
                 console.log(window.localStorage.getItem("nombreUsuario"));
                 $.ajax({
                     url:'http://desde9.esy.es/usuario.php',
                     type: 'GET',
                     data: {type:'login', email:email, password:password},
                     dataType : 'jsonp',
                     success: function(data) {
                         if(data.estatus == true){
                             window.localStorage.setItem("logueado", "si");
                             console.log(data.mensaje);
                             alert(data.mensaje);
                             
                             window.location =("home.html");
                         }else{
                             alert("Error : "+data.mensaje);
                             console.log(data.mensaje);
                         }
                     },error: function(e) {
                         console.log(JSON.stringify(e));
                         alert("ERROR TECNICO CON EL SERVICIO, INTENTE DE NUEVO MAS TARDE " +JSON.stringify(e));
                     }
                 });
             }
        });