/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


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
                "senderID": "400009158834"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, 
            "windows": {} 
        });
        
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").value = data.registrationId;
            console.log(data.registrationId);
            window.localStorage.setItem("regId", data.registrationId);
            console.log(JSON.stringify(data));
        });
        push.on('notification', function(data) {
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
            document.getElementById("regId").innerHTML = 'ERror';
        });
    }
};


app.initialize(); 
     
   $(document).bind("mobileinit", function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    });
        $("#login-button").click(function(event){
		 event.preventDefault();
            var name = $("#name").val();
	        var email = $("#email").val();
            var regId = $("#regId").val();
            
           /* $.getJSON(
                'https://desde.260mb.net/usuario.php?callback=?',  
                {op:'reg', name:name, email:email, regId:regId},
                function(data) {
                    data=JSON.parse(data);
				if(data.estatus == true){
                    console.log(data.mensaje);
				    alert(data.mensaje);                    
                    window.location =("home.html");                    
				}
				else{
                    alert("Error : "+data.mensaje);
                    console.log(data.mensaje);
				}});*/
            
            
           jQuery.ajax({
                url:'https://desde.260mb.net/usuario.php',
                type: 'GET',
                data: {op:'reg', name:name, email:email, regId:regId},
                dataType : 'jsonp',
                //jsonp: false,
                cache : false,
                jsonpCallback: "callback", 
                contentType: "application/json; charset=utf-8",
                timeout: 10000,
                jsonp: 'callback',
                //crossDomain: true,
			success: function(data) {
				if(data.estatus == true){
                    console.log(data.mensaje);
				    alert(data.mensaje);                    
                    window.location =("home.html");                    
				}
				else{
                    alert("Error : "+data.mensaje);
                    console.log(data.mensaje);
				}
			},
                error:function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
                    alert(xhr);
            console.log(ajaxOptions);
                    alert(ajaxOptions);
            console.log(thrownError);
                    alert(thrownError);
        }
			/*error: function(e) {
                console.log(JSON.stringify(e));
				alert("ERROR TECNICO CON EL SERVICIO, INTENTE DE NUEVO MAS TARDE " +JSON.stringify(e));
	//		}
		});*/
    });  

        });
                
        /*if(reg==1)
    {
       
         window.location =("home.html");
    }
   

        
        function registrar(){
            var nombre = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var regId = document.getElementById('regId').value;
            if (regId != "") {
                if (nombre != '' && email != '') {
                    //Enviamos los datos al servidor php
                    document.formulario.submit();
                    var reg=1;
                }
                else{alert('Ingrese un nombre y un correo para el registro en la base de datos.')}
            }
            else
                {alert('Esperando regId del registro en GCM!');}
        }*/
      