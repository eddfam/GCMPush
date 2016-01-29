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
// Init App
var app = {
    
    initialize: function(){// Application Constructor
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function(){
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function(){
        var push = PushNotification.init({
            "android": {
                "senderID": "400009158834",
                forceShow: "true"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, 
            "windows": {} 
        });
        push.on('registration', function(data){
            console.log("registration event");
            document.getElementById("regId").value = data.registrationId;
            console.log(data.registrationId);
            window.localStorage.setItem("regId", data.registrationId);
            console.log(JSON.stringify(data));
        });
        push.on('notification', function(data) {
        	console.log("notification event");
            console.log(JSON.stringify(data));
            push.finish(function () {
                console.log('finish successfully called');
            });
        });
        push.on('error', function(e) {
            console.log("push error");
            document.getElementById("regId").innerHTML = 'Error';
        });
    }
};
app.initialize();
$(document).ready(function(){
    var myApp = new Framework7({
    modalTitle: 'Framework7',
    material: true,
    swipePanel: 'left',
});
    var $$ = Dom7;// Expose Internal DOM library
    var mainView = myApp.addView('.view-main',{// Add main view
});
    var usuario= document.getElementById("tipoUsuario");
    var liCantidadNControl= document.getElementById("liCantidadNControl");
    usuario.onchange = function(e){
        var tipo = e.target.value;
        if(tipo =='alumno'){
            console.log(tipo);
            $('#liCantidadNControl option').prop('selected', function() {
                return this.defaultSelected;
            });
            document.getElementById('liCantidadNControl').style.display="none";
            document.getElementById('liNControl2').style.display="none";
            liNControl.innerHTML="";
            $('#liNControl').append('<div class="item-inner"><div class="item-title floating-label">No. Control</div><div class="item-input item-input-field"><input type="number" id="nControl" name="nControl" placeholder="" required></div></div>');
            document.getElementById('liNControl').style.display="block";
        }else if(tipo=='padre'){
            document.getElementById('liNControl').style.display="none";
            document.getElementById('liCantidadNControl').style.display="block";
        }else{
            document.getElementById('liNControl').style.display="none";
            document.getElementById('liCantidadNControl').style.display="none";
        }
    };
    liCantidadNControl.onchange = function(e){
        var cantidad = e.target.value;
        if(cantidad==""){
            var liNControl= document.getElementById('liNControl');
            liNControl.innerHTML="";
            liNControl.style.display="none";
        }
        else if(cantidad=="1"){
            var liNControl= document.getElementById('liNControl');
            document.getElementById('liNControl2').style.display="none";
            liNControl.innerHTML="";
            $('#liNControl').append('<div class="item-inner"><div class="item-title floating-label">No. Control</div><div class="item-input item-input-field"><input type="number" id="nControl" name="nControl" placeholder="" required></div></div>');
            liNControl.style.display="block";
        }else if(cantidad=="2"){
            var liNControl= document.getElementById( 'liNControl');
            var liNControl2 = document.getElementById('liNControl2');
            liNControl.innerHTML="";
            $('#liNControl').append('<div class="item-inner"><div class="item-title floating-label">No. Control</div><div class="item-input item-input-field"><input type="number" id="nControl" name="nControl" placeholder="" required></div></div>');
            liNControl.style.display="block";
            liNControl2.innerHTML="";
            $('#liNControl2').append('<div class="item-inner"><div class="item-title floating-label">No. Control 2</div><div class="item-input item-input-field"><input type="number" id="nControl2" name="nControl2" placeholder="" required></div></div>');
            liNControl2.style.display="block";
        }
    };
    $("#signup-button").click(function(event){
        event.preventDefault();
        var nControl =$("#nControl").val();
        var nombre = $("#nombre").val();
	    var email = $("#email").val();
        var regId = $("#regId").val();
        var password =$("#password").val();
        var rPassword =$("#rPassword").val();
        function validateEmail(email){ 
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        var tipoUsuario= $("#tipoUsuario").val();
        var cantidadNControl=$("#cantidadNControl").val();
        console.log(tipoUsuario);
        var nControl2 = $("#nControl2").val();
        if (tipoUsuario=='0'||tipoUsuario==undefined) {
            return alert('Elija su tipo de Usuario '+tipoUsuario);
        } else if(tipoUsuario=="padre"&& cantidadNControl==''||cantidadNControl==undefined){
            return alert('No ha elegido la cantidad de Numeros de Control a registrar');
        }else if (nControl==''||nControl==undefined) {
            return alert('Ingrese el numero de control');
        }else if (tipoUsuario=="padre"&&cantidadNControl == "2" && nControl2 == '') {
            return alert('Ingrese el segundo numero de control '+ cantidadNControl);
        } else if(nombre==''||nombre==undefined){
            return alert('Es requerido el  nombre del usuario');
        }else if(password==''||password==undefined){
            return alert('Ingrese una contraseña valida');
        }else if(rPassword==''||rPassword==undefined){
            return alert('Repita su contraseña');
        }else if(password!=rPassword){
            return alert('La contraseña no coincide');
        }else if(email==''||email==undefined){
            return alert('Ingrese su correo electronico');
        }else if (!validateEmail(email)) {
            return alert('Correo electronico no valido');
        }else if (regId==''||regId==undefined) {
            return alert('Esperando asignacion de GCM-ID asegurese de estar conectado a internet');
        }else{
            window.localStorage.setItem("nombreUsuario", nombre);
            window.localStorage.setItem("logueado", "si");
            console.log(window.localStorage.getItem("regId"));
            console.log(window.localStorage.getItem( "nombreUsuario") );
        }
        var data;
        if(tipoUsuario =='alumno'){
            data = {type:'regAlumno', nControl: nControl, nombre:nombre, email:email, regId:regId, password:password, tipoUsuario:tipoUsuario,tipoDispositivo:'Android'};
        }else if(tipoUsuario=='padre' && cantidadNControl=='1'){
            data= {type:'regPadre1nc', nControl: nControl, nombre:nombre, email:email, regId:regId, password:password, tipoUsuario:tipoUsuario,tipoDispositivo:'Android'};
        }else if(tipoUsuario=='padre' && cantidadNControl=='2'){
            data= {type:'regPadre2nc', nControl: nControl, nControl2:nControl2, nombre:nombre, email:email, regId:regId, password:password, tipoUsuario:tipoUsuario,tipoDispositivo:'Android'};
        }
        $.ajax({
            url:'http://desde9.esy.es/usuario.php',
            type: 'GET',
            data: data,
            dataType : 'jsonp',
            success: function(data){
                if(data.estatus == true){
                    if(tipoUsuario =='alumno'){
                        window.localStorage.setItem("nControl", data.nControl);
                        window.localStorage.setItem("tipo", data.tipo);
                    }else if(tipoUsuario=='padre' && cantidadNControl=='1'){
                        window.localStorage.setItem("nControl", data.nControl);
                        window.localStorage.setItem("tipo", data.tipo);
                        window.localStorage.setItem("cantidadNControl", data.numeroNControl);
                    }else if(tipoUsuario=='padre' && cantidadNControl=='2'){
                        window.localStorage.setItem("nControl", data.nControl);
                        window.localStorage.setItem("nControl2", data.nControl2);
                        window.localStorage.setItem("tipo", data.tipo);
                        window.localStorage.setItem("cantidadNControl", data.numeroNControl);
                    }
                    console.log(data.mensaje);
                    alert(data.mensaje);
                    window.location.replace("home.html");
                }else{
                    alert("Error : "+data.mensaje);
                    console.log(data.mensaje);
                }
            },error: function(e){
                console.log(JSON.stringify(e));
                alert("ERROR TECNICO CON EL SERVICIO, INTENTE DE NUEVO MAS TARDE"+JSON.stringify(e));
            }
        });
    });
});