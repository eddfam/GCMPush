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
            "android": {"senderID": "400009158834"},
            "ios": {"alert":"true", "badge":"true", "sound":"true"},
            "windows": {} 
        });
        push.on('notification', function(data){
            console.log("notification event");
            console.log(JSON.stringify(data));
            if(data.title=='forms'){
                mainView.router.load({pageName: 'forms'});
            }else if(data.title=='Noticias'){
                mainView.router.load({pageName: 'noticias'});
            }else if(data.title=='Notificacion'){
                myApp.openPanel('right');
            }push.finish(function(){
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
        swipePanel: 'left',
    });
    var $$ = Dom7;// Expose Internal DOM library
    $$('.open-right-panel').on('click', function(e){
        // 'right' position to open Right panel
        myApp.openPanel('right');
    });
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
                    $("#resultNot").html("");
                    //clear();
                    //add(data);
                    for(var i in data){
                        $("#resultNot").append(
                            '<div class="card">'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'+data[i].contenido+'</div>'
                            +'</div>'
                            +'<div class="card-footer">'+data[i].fecha+'</div>'
                            +'</div>');
                    }
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
                    //clear();
                    //add(data);
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
                    $("#publicaciones").html("");
//                    clear();
//                    add(data);
                    for(var i in data){
                        $("#publicaciones").append(
                            '<div class="card ks-card-header-pic">'
                            +'<div style="background-image:url('+data[i].imagen+')" valign="bottom" class="card-header color-white no-border">'+data[i].titulo+'</div>'
                            +'<div class="card-content">'
                            +'<div class="card-content-inner">'
                            +'<p class="color-gray">'+data[i].fecha+'</p>'
                            +'<p>'+data[i].contenido+'</p></div></div>'
                            +'<div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Read more</a </div></div>');
                    }
                }
            });
            myApp.pullToRefreshDone();
        }, 6000);
    });
    document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("nombreUsuario");
    $("#logout").on("click", function(e){
        e.preventDefault();
        window.localStorage.setItem("logueado", "no");
        window.location.replace("index.html");
    });
});