var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var push = PushNotification.init({
            "android": {
                "senderID": "1234567890",
                forceShow: "true"
            }
        });
        
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = data.registrationId;
            console.log(JSON.stringify(data));
        });
        (new Media('tone.wav')).play();
            alert("desde signup");

        push.on('notification', function(data) {
            alert("notification");
        	console.log("notification event");
            console.log(JSON.stringify(data));
            var cards = document.getElementById("cards");
            var card = '<div class="row">' +
		  		  '<div class="col s12 m6">' +
				  '  <div class="card darken-1">' +
				  '    <div class="card-content black-text">' +
				  '      <span class="card-title black-text">' + data.title + '</span>' +
				  '      <p>' + data.message + '</p>' +
				  '    </div>' +
				  '  </div>' +
				  ' </div>' +
				  '</div>';
            cards.innerHTML += card;
            
            push.finish(function () {
                console.log('finish successfully called');
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });
    }
};

app.initialize();

var myApp = new Framework7({// Init App
    modalTitle: 'Framework7',
    material: true,
    swipePanel: 'left',
});
var $$ = Dom7;// Expose Internal DOM library
var mainView = myApp.addView('.view-main',{// Add main view
});
$("#login-button").click(function(event){
    event.preventDefault();
	var email = $("#email").val();
    var password =$("#password").val();
    function validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    if(email==''||email==undefined){
        return alert('Ingrese su correo electronico');
    }else if(!validateEmail(email)){
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
            },error: function(e){
                console.log(JSON.stringify(e));
                alert("ERROR TECNICO CON EL SERVICIO, INTENTE DE NUEVO MAS TARDE " +JSON.stringify(e));
            }
        });
    }
});