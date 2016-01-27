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
            alert("desde index");

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
