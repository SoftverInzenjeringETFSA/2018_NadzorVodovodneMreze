$(document).ready(function() {
  $(document).ready(function() {
    $("#mjerno-select").select2();
  });
});

var pritisak = document.getElementById("pritisakslider");
var pritisakValue = document.getElementById("pritisakvalue");
pritisakValue.innerHTML = pritisak.value; 

pritisak.oninput = function() {
  pritisakValue.innerHTML = this.value;
};

var duzina = document.getElementById("duzinaslider");
var duzinaValue = document.getElementById("duzinavalue");
duzinaValue.innerHTML = duzina.value;

duzina.oninput = function() {
  duzinaValue.innerHTML = this.value;
};