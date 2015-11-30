var id = localStorage.getItem("regId");
var nombreUsuario = localStorage.getItem("nombreUsuario");

if(id === null & nombreUsuario===null)
    {
        console.log(id+nombreUsuario);
         window.location =("login.html");
    }
   
else
    {
        console.log(id+nombreUsuario);
         window.location =("home.html");
    }