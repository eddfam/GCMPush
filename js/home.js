      $(document).ready(function () {
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
var mainView = myApp.addView('.view-main',{
    domCache: true //enable inline pages
});
// Pull to refresh content
var ptrNotificaciones = $$('.pull-to-refresh-content.notificaciones');
// Add 'refresh' listener on it
          var nc1 = window.localStorage.getItem('nControl');
          var nc2 = window.localStorage.getItem('nControl2');
ptrNotificaciones.on('refresh', function (e){
    setTimeout(function(){
        $.ajax({
            url:'http://desde9.esy.es/notificaciones.php',
            type:'GET',
            data:'type=padre2nc&nControl='+nc1+'&nControl2='+nc2,
            dataType:'json',
            error:function(jqXHR,text_status,strError){
                alert('no internet connection');
            },
            timeout:60000,
            success:function(data){
                $("#resultNot").html("");
                //clear();
                //add(data);
                for(var i in data){
                    $("#resultNot").append(
                       '<div class="card">'
                            //+'<div class="card-header">'+data[i].titulo+'</div>'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'+data[i].contenido+'</div>'
                            +'</div>'
                            +'<div class="card-footer">'+data[i].fecha+'</div>'
                        +'</div>');
                }
            }
        });
        // When loading done, we need to "close" it
        myApp.pullToRefreshDone();
    }, 2000);
});

// Pull to refresh content
var ptrNoticias = $$('.pull-to-refresh-content.noticias');
 
// Add 'refresh' listener on it
ptrNoticias.on('refresh', function (e) {
    setTimeout(function () {
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
                    clear();
                    add(data);
                    for(var i in data){
                    $("#result").append(

                       '<div class="card">'
                            +'<div class="card-header">'+data[i].titulo+'</div>'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'+data[i].descripcion+'</div>'
                            +'</div>'
                            +'<div class="card-footer">'+data[i].fecha+'</div>'
                        +'</div>');
                }
                }
            });
        
        
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
});
var ptrPublicaciones = $$('.pull-to-refresh-content.publicaciones');
 
// Add 'refresh' listener on it
ptrPublicaciones.on('refresh', function (e) {
    setTimeout(function () {
        $.ajax({
                url:'http://desde9.esy.es/noticias.php',
                type:'POST',
               
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no internet connection');
                }, 
                timeout:60000,
                success:function(data){
                    $("#publicaciones").html("");
//                    clear();
//                    add(data);
                    for(var i in data){
                    $("#publicaciones").append(

                       '<div class="card">'
                            +'<div class="card-header">'+data[i].titulo+'</div>'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'+data[i].descripcion+'</div>'
                            +'</div>'
                            +'<div class="card-footer">'+data[i].fecha+'</div>'
                        +'</div>'

                        /*"<li>"+JSON.stringify(data[i].descripcion)+"</li>"*/);
                }
                }
            });
        
        
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
});
      });
          
          
          
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;
            

function startDB() {
            
    dataBase = indexedDB.open("database", 1);

    dataBase.onupgradeneeded = function (e) {

        active = dataBase.result;

        object = active.createObjectStore("noticias", { keyPath : 'id', autoIncrement : true });
        object.createIndex('by_serverId', 'serverId', { unique : true });
        object.createIndex('by_fecha', 'fecha', { unique : true });
    };

    dataBase.onsuccess = function (e) {
        //alert('Base de datos cargada correctamente');

    };

    dataBase.onerror = function (e)  {
        alert('Error cargando la base de datos');
    };
}
function add(datos) {
    var active = dataBase.result;
    var data = active.transaction(["noticias"], "readwrite");
    var object = data.objectStore("noticias");
    
    for(var i=0;i<datos.length;i++){
        var request=object.put({ //Añadimos un nuevo registro en la DB
            titulo:datos[i].titulo,
            descripcion:datos[i].descripcion,
            fecha:datos[i].fecha,
            serverId:datos[i].id
        });

    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        alert('Objeto agregado correctamente');
    };

}
}
function cargarIDB(){
    var active = dataBase.result;
    var data = active.transaction(["noticias"], "readonly");
    var object = data.objectStore("noticias");

    var elements = [];

    object.openCursor().onsuccess = function (e) {

        var result = e.target.result;

        if (result === null) {
            return;
        }

        elements.push(result.value);
        result.continue();

    };

    data.oncomplete = function () {

        var outerHTML = '';

        for (var key in elements) {

            outerHTML += 
                
                
                '<div class="card">'
                            +'<div class="card-header">'+elements[key].titulo+'</div>'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'+elements[key].descripcion+'</div>'
                            +'</div>'
                            +'<div class="card-footer">'+elements[key].fecha+'</div>'
                        +'</div>';

        }

        elements = [];
        $("#result").html("");
        document.querySelector("#result").innerHTML = outerHTML;
    };


}
function clear() {
    var active = dataBase.result;
    var data = active.transaction(["noticias"], "readwrite");
    var object = data.objectStore("noticias").clear();
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var push = PushNotification.init({
            "android": {
                "senderID": "400009158834"
            },
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, 
            "windows": {} 
        });
        
        push.on('notification', function(data) {
        	console.log("notification event");
            console.log(JSON.stringify(data));
            
            if(data.title=='forms')
                {
                    mainView.router.load({pageName: 'forms'});
                }
            else if(data.title=='Noticias')
                {
                    mainView.router.load({pageName: 'noticias'});
                    cargarIDB();
                }
            else if(data.title=='Notificacion')
                {
                    myApp.openPanel('right');
                    //cargarIDB();
                }
            
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
