const buscar = document.querySelector('#btn-form');

//inicializar variables
var table = document.getElementById("tabla");
var piloto = "";
var temporada=0;
var gp = "";
var escuderia="";
var pagina=0;


//recogemos info del form
document.addEventListener('DOMContentLoaded',function(){
    generarTabla();

    document.querySelector('form').onsubmit = () =>{
        piloto = document.querySelector('#Piloto').value;
        temporada = document.querySelector('#Temporada').value;
        gp = document.querySelector('#gp').value;
        escuderia = document.querySelector('#Escuderia').value;

        generarTabla();
        return false;
    }
});

//funcion para eliminar datos de la tabla
function reiniciar(){
    var cuenta = table.rows.length;
    for (var i = cuenta-1;i>0;i--){
        table.deleteRow(i);
    }
}

//funcion para generar tabla
function generarTabla()
{

    loading.classList.remove("visually-hidden");
      
    reiniciar();
    extra="";
    extra2="";

    let api = "http://ergast.com/api/f1/" + extra + "drivers" + extra2;

    if (temporada !== ""){
        extra += temporada + "/";
        

    }
    if (escuderia !== ""){
        extra+= "constructors/" + escuderia + "/";
    }

    if (gp !== ""){
        extra += "circuits/" + gp + "/";
    }

    if (piloto !== ""){
        extra2 += "/" + piloto
    }
    api = "http://ergast.com/api/f1/" + extra + "drivers" + extra2 + ".json";
      
    
    fetch(api) 
            .then(response =>  response.json())
            .then(data => {
                
                const drivers = data.MRData.DriverTable.Drivers;
                
                if(drivers.length>0){
                    
                    document.querySelector('#mensaje').innerHTML = "SE HAN ENCONTRADO " +drivers.length + " RESULTADOS";

                    for(let i = 0;i<drivers.length;i++){
                        
                        var row = table.insertRow();

                        var nombre = row.insertCell(0);
                        nombre.classList.add('align-middle');
                        var fecha = row.insertCell(1);
                        fecha.classList.add('align-middle');
                        var numero = row.insertCell(2);
                        numero.classList.add('align-middle');
                        var nacion = row.insertCell(3);
                        nacion.classList.add('align-middle');
                        
                        nombre.innerHTML = (drivers[i].givenName) +" " +(drivers[i].familyName);
                        fecha.innerHTML = drivers[i].dateOfBirth;
                        numero.innerHTML = drivers[i].permanentNumber;
                        nacion.innerHTML = drivers[i].nationality;
                    }}
                else{
                    document.querySelector('#mensaje').innerHTML = "NO SE HAN ENCONTRADO RESULTADOS";
                    }

                })

            
    setTimeout(function(){

        loading.classList.add("visually-hidden");
    }, 1000)
    
}