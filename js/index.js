var id = localStorage.getItem("regId");
//window.localStorage.setItem("regId", "value");
if(id === null)
    {
        console.log(id);
         window.location =("login.html");
    }
   
else
    {
        console.log(id);
         window.location =("home.html");
    }