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
            "android": {
                "senderID": "400009158834",
                forceShow: "true"
                       }
        });
        push.on('registration', function(data) {
            console.log("registration event");
            document.getElementById("regId").innerHTML = data.registrationId;
            console.log(JSON.stringify(data));
        });
        (new Media('tone.wav')).play();
            alert("desde Home");
        push.on('notification', function(data){
            (new Media('tone.wav')).play();
            alert("desde home");
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
    // Init App
    var myApp = new Framework7({
        modalTitle: 'Framework7',
        material: true,
        //swipePanel: 'left',
    });
    var $$ = Dom7;// Expose Internal DOM library

    
//    var classList = $$('body')[0].classList;
//        for (var i = 0; i < classList.length; i++) {
//            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
//        }
//    classList.add('theme-lightgreen' );
//    $$('.open-right-panel').on('click', function(e){
//        // 'right' position to open Right panel
//        myApp.openPanel('right');
//    });
    var mainView = myApp.addView('.view-main',{// Add main view
        domCache: true //enable inline pages
    });
    // Pull to refresh content
    var ptrNotificaciones = $$('.pull-to-refresh-content.notificaciones');
    // Add 'refresh' listener on it
    var tipoUsuario = window.localStorage.getItem('tipo');
    var cantidadNControl = window.localStorage.getItem('cantidadNControl');
    var nc1 = window.localStorage.getItem('nControl');
    var nc2 = window.localStorage.getItem('nControl2');
    var data;
    if(tipoUsuario=='alumno'){
        data = 'type=alumno&nControl='+nc1;
    }else if(tipoUsuario=='padre'&& cantidadNControl==1){
        data = 'type=padre1nc&nControl='+nc1;
    }else if(tipoUsuario=='padre'&& cantidadNControl==2){
        data = 'type=padre2nc&nControl='+nc1+'&nControl2='+nc2;
    }
    ptrNotificaciones.on('refresh', function (e){
        setTimeout(function(){
            $.ajax({
                url:'http://desde9.esy.es/notificaciones.php',
                type:'GET',
                data:data,
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no internet connection');
                },
                timeout:60000,
                success:function(data){
                    borrarNotificaciones();
                    addNotificacion(data);
                }
            });
            myApp.pullToRefreshDone();// When loading done, we need to "close" it
        }, 2000);
    });
    // Pull to refresh content
    var ptrNoticias = $$('.pull-to-refresh-content.noticias');
    // Add 'refresh' listener on it
    ptrNoticias.on('refresh', function(e){
        setTimeout(function(){
            $.ajax({
                url:'http://desde9.esy.es/noticias.php',
                type:'POST',               
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no internet connection');
                }, 
                timeout:60000,
                success:function(data){
                    $("#result").html("");
                    borrarNoticias();
                    addNoticia(data);
                }
            });
            myApp.pullToRefreshDone();
        }, 2000);
    });
    var ptrPublicaciones = $$('.pull-to-refresh-content.publicaciones');
    ptrPublicaciones.on('refresh', function(e){
        setTimeout(function(){
            $.ajax({
                url:'http://desde9.esy.es/publicaciones.php',
                type:'POST',               
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no internet connection');
                }, 
                timeout:60000,
                success:function(data){
                    $("#resultPublicaciones").html("");
                    borrarPublicaciones();
                    addPublicacion(data);
                }
            });
            myApp.pullToRefreshDone();
        }, 6000);
    });
    var ptrEventos = $$('.pull-to-refresh-content.eventos');
    ptrEventos.on('refresh', function(e){
        setTimeout(function(){
            $.ajax({
                url:'http://desde9.esy.es/eventos.php',
                type:'POST',               
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no internet connection');
                }, 
                timeout:60000,
                success:function(data){
                    $("#resultEventos").html("");
                    borrarEventos();
                    addEventos(data);
                }
            });
            myApp.pullToRefreshDone();
        }, 2000);
    });
    document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("nombreUsuario");
    $("#logout").on("click", function(e){
        e.preventDefault();
        window.localStorage.setItem("logueado", "no");
        window.location.replace("index.html");
    });
    $('#miCuentaNombre').blur(function(){
        document.getElementById('miCuentaNombre').disabled = true;
    });
    $('#miCuentaEmail').blur(function(){
        document.getElementById('miCuentaEmail').disabled = true;
    });
    $('#miCuentaNoControl').blur(function(){
        document.getElementById('miCuentaNoControl').disabled = true;
    });
    document.getElementById('miCuentaNombre').value=localStorage.getItem('nombreUsuario');
    document.getElementById('miCuentaEmail').value=localStorage.getItem('email');
    document.getElementById('miCuentaNoControl').value=localStorage.getItem('nControl');
    
    var actionSheetNombre = [
        [
            {
                text: 'Desea editar su nombre',
                label: true
            },
            {
                text: 'Si',
                onClick: function () {
                    document.getElementById('miCuentaNombre').disabled = false;
                    document.getElementById('miCuentaNombre').focus();
                }
            },
            {
                text: 'No',
            },
        ],
    ];
    $$('.inputNombre').on('click', function(e){
        myApp.actions(actionSheetNombre);
    });
    var actionSheetEmail = [
        [
            {
                text: 'Desea editar su Email',
                label: true
            },
            {
                text: 'Si',
                onClick: function () {
                    document.getElementById('miCuentaEmail').disabled = false;
                    document.getElementById('miCuentaEmail').focus();
                }
            },
            {
                text: 'No',
            },
        ],
    ];
    $$('.inputEmail').on('click', function(e){
        myApp.actions(actionSheetEmail);
    });
    var actionSheetNoControl = [
        [
            {
                text: 'Desea editar el numero de control',
                label: true
            },
            {
                text: 'Si',
                onClick: function () {
                    document.getElementById('miCuentaNoControl').disabled = false;
                    document.getElementById('miCuentaNoControl').focus();
                }
            },
            {
                text: 'No',
            },
        ],
    ];
    $$('.inputNoControl').on('click', function(e){
        myApp.actions(actionSheetNoControl);
    });
    $$('#update-button').on('click', function(){
        myApp.modalPassword('Introduzca su contraseña', function (password) {
//            myApp.alert('Thank you! Password: ' + password);
        });
    });
});
if (window.openDatabase){
    var mydb = openDatabase("gsm_android_push", "0.1", "DB of gsmApp", 5 * 1024 * 1024);
    mydb.transaction(function (t){
        t.executeSql("CREATE TABLE IF NOT EXISTS noticias (serverId INTEGER, titulo VARCHAR(90), descripcion VARCHAR(255), fecha VARCHAR(20))");
        t.executeSql("CREATE TABLE IF NOT EXISTS publicaciones (serverId INTEGER, titulo VARCHAR(100), contenido mediumtext, fecha datetime, imagen mediumtext)");
        t.executeSql("CREATE TABLE IF NOT EXISTS notificaciones (serverId INTEGER, contenido VARCHAR(256), fecha datetime)");
        t.executeSql("CREATE TABLE IF NOT EXISTS eventos (serverId INTEGER, titulo VARCHAR(100), ubicacion VARCHAR(100), descripcion mediumtext, fecha date, hora time)");
    });
}else{
    alert("Su dispositivo no soporta Bases de Datos local");
}
function addNoticia(datos){
    if (mydb){
        mydb.transaction(function (t){
            
            for(var i=0;i<datos.length;i++){
            t.executeSql("INSERT INTO noticias (serverId, titulo, descripcion, fecha) VALUES (?, ?, ?, ?)", [datos[i].id, datos[i].titulo, datos[i].descripcion, datos[i].fecha]);
            }
            mostrarNoticias();
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function addPublicacion(datos){
    if (mydb){
        mydb.transaction(function (t){
            for(var i=0;i<datos.length;i++){
                t.executeSql("INSERT INTO publicaciones (serverId, titulo, contenido, fecha, imagen) VALUES (?, ?, ?, ?, ?)", [datos[i].id, datos[i].titulo, datos[i].contenido, datos[i].fecha, datos[i].imagen]);
            }
            mostrarPublicaciones();
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function addNotificacion(datos){
    if(mydb){
        mydb.transaction(function(t){
            for(var i=0;i<datos.length;i++){
                t.executeSql("INSERT INTO notificaciones(contenido, fecha) VALUES (?, ?)", [datos[i].contenido, datos[i].fecha]);
            }
            mostrarNotificaciones();
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function addEventos(datos){
    if(mydb){
        mydb.transaction(function(t){
            for(var i=0;i<datos.length;i++){
                t.executeSql("INSERT INTO eventos(serverId, titulo, ubicacion, descripcion, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)", [datos[i].id, datos[i].titulo, datos[i].ubicacion, datos[i].descripcion, datos[i].fecha, datos[i].hora]);
            }
            mostrarEventos();
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function mostrarNoticias(){
    if (mydb){
        mydb.transaction(function(tx){
            tx.executeSql("SELECT count(*) FROM noticias",[], function(tx,result){
                var count = result.rows.item(0)["count(*)"];
                console.log("dd " +count);
                if(count == 0){
                    //alert(count + " noticias almecenadas, actualize");
                }else if(count!= 0){
                    //alert("tengo registros guardados "+count);
                    mydb.transaction(function(t){ t.executeSql("SELECT * FROM noticias ", [], llenarNoticias);});
                }
            });
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function mostrarPublicaciones(){
    if (mydb){
        mydb.transaction(function(tx){
            tx.executeSql("SELECT count(*) FROM publicaciones",[], function(tx,result){
                var count = result.rows.item(0)["count(*)"];
                console.log("dd " +count);
                if(count == 0){
                    //alert(count + " publicaciones almecenadas, actualize");
                }else if(count!= 0){
//                    alert(count+ " publicaciones almacenadas");
                    mydb.transaction(function(t){ t.executeSql("SELECT * FROM publicaciones ", [], llenarPublicaciones);});
                }
            });
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function mostrarNotificaciones(){
    if (mydb){
        mydb.transaction(function(tx){
            tx.executeSql("SELECT count(*) FROM notificaciones",[], function(tx,result){
                var count = result.rows.item(0)["count(*)"];
                console.log("dd " +count);
                if(count == 0){
                    //alert(count + " notificaciones almecenadas, actualize");
                }else if(count!= 0){
                    //alert(count + " notificaciones almacenadas");
                    mydb.transaction(function(t){ t.executeSql("SELECT * FROM notificaciones ", [], llenarNotificaciones);});
                }
            });
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function mostrarEventos(){
    if (mydb){
        mydb.transaction(function(tx){
            tx.executeSql("SELECT count(*) FROM eventos",[], function(tx,result){
                var count = result.rows.item(0)["count(*)"];
                console.log("dd " +count);
                if(count == 0){
                    //alert(count + " eventos almecenados, actualize");
                }else if(count!= 0){
//                    alert(count + " eventos almacenados");
                    mydb.transaction(function(t){t.executeSql("SELECT * FROM eventos ", [], llenarEventos);});
                }
            });
        });
    } else {
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function llenarNoticias(transaction, results){
    var listholder = document.getElementById("resultNoticias");
    listholder.innerHTML = "";
    var i;
    for(i=0;i<results.rows.length; i++){
        var row = results.rows.item(i);
        listholder.innerHTML +=
            '<div class="card">'
            +'<div class="card-header">'+row.titulo+'</div>'
            +'<div class="card-content">'
            +'<div class="card-content-inner">'+row.descripcion+'</div>'
            +'</div>'
            +'<div class="card-footer">'+row.fecha+'</div>'
            +'</div>';
    }
    listholder.style.marginBottom='60px';
}
function llenarPublicaciones(transaction, results){
    var listholder = document.getElementById("resultPublicaciones");
    listholder.innerHTML = "";
    var i;
    for(i=0;i<results.rows.length; i++){
        var row = results.rows.item(i);
        listholder.innerHTML +=
            '<div class="card ks-card-header-pic">'
            +'<div style="background-image:url('+row.imagen+')" valign="bottom" class="card-header color-white no-border">'+row.titulo+'</div>'
            +'<div class="card-content">'
            +'<div class="card-content-inner">'
            +'<p class="color-gray">'+row.fecha+'</p>'
            +'<p>'+row.contenido+'</p></div></div>'
            +'<div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Read more</a </div></div>';
    }
}
function llenarNotificaciones(transaction, results){
    var listholder = document.getElementById("resultNotificaciones");
    listholder.innerHTML = "";
    var i;
    for(i=0;i<results.rows.length; i++){
        var row = results.rows.item(i);
        listholder.innerHTML +=
            '<div class="card">'
            +'<div class="card-content">'
            +'<div class="card-content-inner">'+row.contenido+'</div>'
            +'</div>'
            +'<div class="card-footer">'+row.fecha+'</div>'
            +'</div>';
    }
}
function mes(fecha){
    var m_names = new Array("ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC");
    var d = new Date(fecha);
    
    var month = d.getMonth();
    return (m_names[month]);
}
function dia(fecha){
    var d = new Date(fecha);
    d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
    var date = d.getDate();
    return (date);
}
function llenarEventos(transaction, results){
    var listholder = document.getElementById("resultEventos");
    listholder.innerHTML = "";
    var i;
    for(i=0;i<results.rows.length; i++){
        var row = results.rows.item(i);
        
        listholder.innerHTML +=
            
            '<li><a href="#" class="item-link item-content">'
            +'<div class="item-media events"><center><div class="date">'+dia(row.fecha)+'</div></center><br><center><div class="month">'+mes(row.fecha)+'</div></center></div>'
            +'<div class="item-inner">'
            +'<div class="item-title-row">'
            +'<div class="item-title">'+row.titulo+'</div>'
            +'<div class="item-after">'+row.hora+'</div>'
            +'</div>'
            +'<div class="item-subtitle">'+row.ubicacion+'</div>'
            +'<div class="item-text">'+row.descripcion+'</div>'
            +'</div></a></li>';
    }
}
function borrarNoticias(){
    if (mydb){
        mydb.transaction(function (t){
            t.executeSql("DELETE FROM noticias", [], llenarNoticias);
        });
    }else{
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function borrarPublicaciones(){
    if (mydb){
        mydb.transaction(function (t){
            t.executeSql("DELETE FROM publicaciones", [], llenarPublicaciones);
        });
    }else{
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function borrarNotificaciones(){
    if (mydb){
        mydb.transaction(function (t){
            t.executeSql("DELETE FROM notificaciones", [], llenarNotificaciones);
        });
    }else{
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}
function borrarEventos(){
    if (mydb){
        mydb.transaction(function (t){
            t.executeSql("DELETE FROM eventos", [], llenarEventos);
        });
    }else{
        alert("Su dispositivo no soporta Bases de Datos local");
    }
}