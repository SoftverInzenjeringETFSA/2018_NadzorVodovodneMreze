import React, { Component } from 'react';

/*var Vodostaji=(function(){
    return{
        dodavanje:function(vodostaj){
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
})();*/

class Vodostaji extends Component {
    constructor(props){
        super(props);
   /* var Water_level=(function(){
        return{
            dodavanje:function(vodostaj){
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
    })();*/
}
    render() {
       return (<div> <div>Pozz vodostaji</div>
                <div> Jos jedan pozz </div>
                </div>);
    }
}

export default Vodostaji;