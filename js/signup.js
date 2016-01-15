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


//if(logueado === "si")
//    {
//        console.log(logueado);
//         window.location.replace("home.html");
//    }
//   
//if (logueado=== "no")
//    {
//        console.log(logueado);
//        window.location.replace("signup.html");
//    }
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
                 var Data;
                 var tipoUsuario = window.localStorage.getItem('tipo');
                 if(tipoUsuario == 'alumno'){
                     Data = 'type=loginAlumno&&email='+email+'&&password='+password;
                 }else if(tipoUsuario == 'padre'){
                     Data = 'type=loginUsuario&&email='+email+'&&password='+password;
                 }
                 $.ajax({
                     url:'http://desde9.esy.es/usuario.php',
                     type: 'GET',
                     data: Data,
                     dataType : 'jsonp',
                     success: function(data){
                         if(data.estatus == true){
                             window.localStorage.setItem("logueado", "si");
                             console.log(data.mensaje);
                             alert(data.mensaje);
                             
                             window.location.replace("home.html");
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