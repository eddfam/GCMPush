
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
    domCache: true //enable inline pages
});
// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');
 
// Add 'refresh' listener on it
ptrContent.on('refresh', function (e) {
    setTimeout(function () {
            
        
        $.ajax({
                url:'http://desde9.esy.es/noticias.php',
                type:'POST',
               
                dataType:'json',
                error:function(jqXHR,text_status,strError){
                    alert('no connection');
                }, 
                timeout:60000,
                success:function(data){
                    $("#result").html("");
                    for(var i in data){
                    $("#result").append(

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

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            
            function startDB() {
            
                dataBase = indexedDB.open("database", 1);
                
                dataBase.onupgradeneeded = function (e) {

                    active = dataBase.result;
                    
                    object = active.createObjectStore("noticias", { keyPath : 'id', autoIncrement : true });
                    object.createIndex('by_idServer', 'idServer', { unique : true });
                    object.createIndex('by_fecha', 'fecha', { unique : true });
                };

                dataBase.onsuccess = function (e) {
                    alert('Base de datos cargada correctamente');
        
                };
        
                dataBase.onerror = function (e)  {
                    alert('Error cargando la base de datos');
                };
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
