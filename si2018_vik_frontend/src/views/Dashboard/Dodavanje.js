var Dodavanje=(function(){
    return{
        dodaj:function(vodostaj){
            var ajax = new XMLHttpRequest();
            //console.log(stud);
             ajax.onreadystatechange = function() {// Anonimna funkcija
                   if (ajax.readyState == 4 && ajax.status == 200)
                       console.log("Uspjesno dodavanje vodostaja");
                       
                   else if (ajax.readyState == 4)
                   console.log(ajax.status,ajax.responseText);
                };
               ajax.open("POST","http://localhost:3000/vodostaji",true);
               ajax.setRequestHeader("Content-Type", "application/json");
               ajax.send(vodostaj);
        }
    }
})();