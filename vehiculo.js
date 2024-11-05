class Vehiculo
{
    id = 0;
    modelo = "";
    anoFabricacion = 0;
    velMax = 0;

    constructor(id, modelo, anoFabricacion, velMax)
    {                
        this.id = id;  
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion; 
        this.velMax = velMax;                         
    }

    toString() 
    {
        return `Id: ${this.id}, Modelo: ${this.modelo}, Año Fabricacion: ${this.anoFabricacion}, Velocidad Max: ${this.velMax}`;
    }         
  
}

class Auto extends Vehiculo
{
    cantidadPuertas = 0;
    asientos = 0;

    constructor(id, modelo, anoFabricacion, velMax, cantidadPuertas, asientos)
    {                
        super(id, modelo, anoFabricacion, velMax);

        this.cantidadPuertas = cantidadPuertas;
        this.asientos = asientos;
    }

    toString() 
    {
        return `${super.toString()}, Cantidad de Puertas: ${this.cantidadPuertas}, Asientos: ${this.asientos}`;
    }     
}

class Camion extends Vehiculo
{
    carga = 0;
    autonomia = 0;

    constructor(id, modelo, anoFabricacion, velMax, carga, autonomia)
    {                
        super(id, modelo, anoFabricacion, velMax);

        this.carga = carga;
        this.autonomia = autonomia;
    }

    toString() 
    {
        return `${super.toString()}, Carga: ${this.carga}, Autonomia: ${this.autonomia}`;
    }     
}

// --- FUNCIONES ---
function MostrarSpinner()
{
    if(document.getElementById("spinner").style.display == "flex")
    {
        document.getElementById("spinner").style.display = "none";
    }

    else{
        document.getElementById("spinner").style.display = "flex";
    }
}

function CargarListaVehiculo()
{
    var xmlhttp = new XMLHttpRequest();

    MostrarSpinner();

    xmlhttp.onreadystatechange = function ()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            let vehiculosJson = JSON.parse(xmlhttp.response);

            console.log(vehiculosJson);

            CrearListaVehiculos(vehiculosJson); 
            CrearTabla();
            MostrarSpinner();

            alert("Carga exitosa.");                     
        } 
    }

    xmlhttp.open("GET", url);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send();
}

function CrearTabla()
{
    let tabla = document.getElementById("tablaVehiculos");
    let thead;

    if (document.getElementById("thVehiculo") == null) 
    {
        thead = document.createElement("thead");
        thead.id = "thVehiculo";

        tabla.appendChild(thead);
    }
    else {
        LimpiarEncabezados();
    }

    thead = document.getElementById("thVehiculo");

    let trHead = document.createElement("tr");
    thead.appendChild(trHead);

    let encabezado = 
    [
        "ID",
        "Modelo",
        "Año Fabricacion",
        "Velocidad Max",
        "Cantidad Puertas",
        "Asientos",
        "Carga",
        "Autonomia",        
        "Modificar",
        "Eliminar"
    ];

    for (let i = 0; i < encabezado.length; i++) 
    {
        let th = document.createElement("th");
        let thTexto = document.createTextNode(encabezado[i]);

        th.appendChild(thTexto);
        trHead.appendChild(th);
    }

    tabla.appendChild(thead);

    let tbody
    if (document.getElementById("tdVehiculo") == null) 
    {
        tbody = document.createElement("tbody");
        tbody.id = "tdVehiculo";
        tabla.appendChild(tbody);
    }
    else {
        LimpiarBody();
    }

    tbody = document.getElementById("tdVehiculo");

    let contador = 0;
    listaDeVehiculos.forEach(function (vehiculo) 
    {
        console.log(vehiculo);
        if (vehiculo instanceof Vehiculo) 
        {
            let tr = document.createElement("tr");
            tr.id = "tr" + contador;
            contador++;
            tbody.appendChild(tr);

            for (let i = 0; i < encabezado.length - 2; i++){

                let td = document.createElement("td");
                let tdTexto = document.createTextNode("N/A");

                switch (i) 
                {
                    case 0:
                        tdTexto = document.createTextNode(vehiculo.id);
                        break;

                    case 1:
                        tdTexto = document.createTextNode(vehiculo.modelo);
                        break;

                    case 2:
                        tdTexto = document.createTextNode(vehiculo.anoFabricacion);
                        break;

                    case 3:
                        tdTexto = document.createTextNode(vehiculo.velMax);
                        break;

                    case 4:
                        if (vehiculo instanceof Auto) {
                            tdTexto = document.createTextNode(vehiculo.cantidadPuertas);
                        }
                        break;

                    case 5:
                        if (vehiculo instanceof Auto) {
                            tdTexto = document.createTextNode(vehiculo.asientos);
                        }
                        break;

                    case 6:
                        if (vehiculo instanceof Camion) {
                            tdTexto = document.createTextNode(vehiculo.carga);
                        }
                        break;

                    case 7:
                        if (vehiculo instanceof Camion) {
                            tdTexto = document.createTextNode(vehiculo.autonomia);
                        }
                        break;                 
                    
                }

                td.appendChild(tdTexto);
                tr.appendChild(td);

            }

            // --- ELIMINAR ---
            let tdEliminar = document.createElement("td");
            let botonEliminar = document.createElement("input");

            botonEliminar.type = "button";
            botonEliminar.id = "eliminar";
            botonEliminar.value = "Eliminar";
            tdEliminar.appendChild(botonEliminar);

            botonEliminar.addEventListener("click", function()
            { 
                document.getElementById("encabezadoFormularioABM").textContent = "Formulario de Eliminación";                
                document.getElementById('formLista').style.display = 'none';      
                ObtenerDatosFila(tr, 'eliminar');                         
            });
            
            tr.appendChild(tdEliminar);

            // --- MODIFICAR ---
            tdModificar.appendChild(botonModificar);
            tr.appendChild(tdModificar);

            let tdModificar = document.createElement("td");
            let botonModificar = document.createElement("input");

            botonModificar.type = "button";
            botonModificar.id = "modificar";
            botonModificar.value = "Modificar";

            botonModificar.addEventListener("click", function()
            { 
                document.getElementById("encabezadoFormularioABM").textContent = "Formulario de Modificación";
                document.getElementById('form_abm').style.display = 'block';                
                document.getElementById('formLista').style.display = 'none';

                ObtenerDatosFila(tr, 'modificar'); 
                
            });
        }
    });
}

async function CrearVehiculo() 
{
    let modelo = document.getElementById("atributo1").value;
    let anoFabricacion = document.getElementById("atributo2").value;
    let velMax = document.getElementById("atributo3").value;
    let tipo = document.getElementById("tipoVehiculo").value;    
    let atributo4 = document.getElementById("atributo4").value;
    let atributo5 = document.getElementById("atributo5").value;    
    
    if (tipo == "auto") {
        data = {
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            cantidadPuertas: atributo4,
            asientos: atributo5,
        }
    }
    else if (tipo == "camion") {
        data = {
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            carga: atributo4,
            autonomia: atributo5,
        }
    }

    console.log(data);

    MostrarSpinner();

    try 
    {
        const response = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: 
            {
                'Content-Type': 'application/json'
            },

            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        if (response.ok) {
            response.json().then(resultado => 
            {
                if (resultado.id != null && !isNaN(resultado.id)) {
                    
                    let nuevoVehiculo;
                    if (tipo == "auto" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 2 && atributo5 > 2) {
                        nuevoVehiculo = new Auto(modelo, anoFabricacion, velMax, atributo4, atributo5);
                        listaDeVehiculos.push(nuevoVehiculo);

                        alert("Auto ID: " + resultado.id + " cargado correctamente.");
                    }
                    else if (tipo == "camion" && modelo != null && modelo != "" && anoFabricacion != null && anoFabricacion != "" && velMax > 0 && atributo4 > 0 && atributo5 > 0) 
                    {
                        nuevoVehiculo = new Camion(resultado.id, modelo, anoFabricacion, velMax, atributo4, atributo5);
                        listaDeVehiculos.push(nuevoVehiculo);
                        alert("Camion ID: " + resultado.id + " cargado correctamente.");
                    }
                    else {
                        alert("ERROR. Datos incorrectos.");
                    }

                    CrearTabla();  
                }
    
                else 
                {
                    alert("ERROR. Verificar ID.");
                }

                MostrarSpinner();
                ReiniciarABM();
                
            });
        }
        else 
        {
            let resultado = await response.text();
            throw new Error(resultado);
        }
    }
    catch (error) 
    {
        console.error("ERROR. ", error);
        alert(error);

        MostrarSpinner();
        ReiniciarABM();        
    }
}

function ObtenerDatosFila(fila, accion) 
{
    var datos = [];
    var celdas = fila.querySelectorAll('td');
    document.getElementById("tipoVehiculo").disabled = true;  

    celdas.forEach(function(celda) 
    {
        datos.push(celda.textContent || '');
    });
    
    
    if(datos[4] != 'N/A')
    {
        autoSeleccionado = new Auto(datos[0],datos[1],datos[2],datos[3],datos[4],datos[5]);
        console.log(autoSeleccionado.toString());

        document.getElementById("id").value = autoSeleccionado.id;
        document.getElementById("tipoVehiculo").value = "auto";
        document.getElementById("atributo1").value = autoSeleccionado.modelo;
        document.getElementById("atributo2").value = autoSeleccionado.anoFabricacion;
        document.getElementById("atributo3").value = autoSeleccionado.velMax;
        document.getElementById("atributo4").value = autoSeleccionado.cantidadPuertas;
        document.getElementById("atributo5").value = autoSeleccionado.asientos;        
        document.getElementById("form_abm").style.display = 'block';

        CambiarAtributos();
    }
    else
    {        
        camionSeleccionado = new Camion(datos[0],datos[1],datos[2],datos[3],datos[6],datos[7]);
        console.log(camionSeleccionado.toString());
        document.getElementById("id").value = datos[0];
        document.getElementById("tipoVehiculo").value = "camion";
        document.getElementById("atributo1").value = camionSeleccionado.modelo;
        document.getElementById("atributo2").value = camionSeleccionado.anoFabricacion;
        document.getElementById("atributo3").value = camionSeleccionado.velMax;
        document.getElementById("atributo4").value = camionSeleccionado.carga;
        document.getElementById("atributo5").value = camionSeleccionado.autonomia;
        CambiarAtributos();
    }
    
    if(accion == 'modificar')
    {
        document.getElementById("agregarAbm").style.display = 'none';  
        document.getElementById("modificarAbm").style.display = 'block';    
        document.getElementById("eliminarAbm").style.display = 'none';   
    }
    else if(accion == 'eliminar')
    {
        document.getElementById("agregarAbm").style.display = 'none';  
        document.getElementById("modificarAbm").style.display = 'none';    
        document.getElementById("eliminarAbm").style.display = 'block';   
        document.getElementById("form_abm").style.display = 'block';
    }
}

function CrearListaVehiculos(vehiculosObj)
{
    listaVehiculos = vehiculosObj.map(vehiculo => 
    {
        let nuevoVehiculo;
        
        if ("cantidadPuertas" in vehiculo && "asientos" in vehiculo)
        {
            nuevoVehiculo = new Auto(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.cantidadPuertas, vehiculo.asientos);
        }
        else if ("carga" in vehiculo && "autonomia" in vehiculo) 
        {
            nuevoVehiculo = new Camion(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.carga, vehiculo.autonomia);
        }
        
        return nuevoVehiculo;
    });
}

function ReiniciarABM()
{
    document.getElementById("id").value="";
    document.getElementById("atributo1").value="";
    document.getElementById("atributo2").value="";
    document.getElementById("atributo3").value="";    
    document.getElementById("atributo4").value="";    
    document.getElementById("atributo5").value="";

    if(document.getElementById("tipoVehiculo").disabled == true){
        document.getElementById("tipoVehiculo").disabled = false;
    }    
}

function ModificarVehiculo() 
{
    let id = document.getElementById("id").value;
    let modelo = document.getElementById("atributo1").value;
    let anoFabricacion = document.getElementById("atributo2").value;
    let velMax = document.getElementById("atributo3").value;
    let tipo = document.getElementById("tipoVehiculo").value;    
    let atributo4 = document.getElementById("atributo4").value;
    let atributo5 = document.getElementById("atributo5").value;

    console.log("Modificar: " + modelo + " - " +  anoFabricacion + " - " + velMax + " - " + atributo4 + " - " + atributo5 + " - " + tipo);

    if (tipo == "auto") {
        data = 
        {
            id: id,
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            cantidadPuertas: atributo4,
            asientos: atributo5,
        }
    }
    else if (tipo == "camion") {
        data = 
        {
            id: id,
            modelo: modelo,
            anoFabricacion: anoFabricacion,
            velMax: velMax,
            carga: atributo4,
            autonomia: atributo5,
        }
    }

    MostrarSpinner();

    fetch(url,
        {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },

            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => 
            {
            if (!response.ok) 
                {
                return response.text().then(mensajeError => 
                {
                    throw new Error(mensajeError);
                });
            }
            else 
            {
                if (tipo == "auto" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 2 && atributo5 > 2) 
                {
                    CambiarAtributos();
                    response.text().then(mensajeExito => 
                    {
                        listaDeVehiculos.map(vehiculo => 
                        {
                            if (vehiculo.id == id) 
                            {
                                vehiculo.modelo = modelo;
                                vehiculo.anoFabricacion = anoFabricacion;
                                vehiculo.velMax = velMax;
                                vehiculo.cantidadPuertas = atributo4;
                                vehiculo.asientos = atributo5;                                                               
                            }
                        });

                        alert(mensajeExito);
                        CrearTabla();
                    })

                }
                else if (tipo == "camion" && modelo != null && modelo != "" && anoFabricacion > 1985 && velMax > 0 && atributo4 > 0 && atributo5 > 0) 
                {
                    CambiarAtributos();
                    response.text().then(mensajeExito => 
                    {
                        listaDeVehiculos.map(vehiculo => 
                        {
                            if (vehiculo.id == id) 
                            {
                                vehiculo.modelo = modelo;
                                vehiculo.anoFabricacion = anoFabricacion;
                                vehiculo.velMax = velMax;
                                vehiculo.cantidadPuertas = atributo4;
                                vehiculo.asientos = atributo5;                                                               
                            }
                        });
                        alert(mensajeExito);
                        CrearTabla();
                    })
                }
                else 
                {
                    alert("ERROR. Revisar datos.");
                }
            }
        }).catch(error => 
        {
            console.error("ERROR. ", error);
            alert(error);
        }).then(() => 
        {
            MostrarSpinner();           
            ReiniciarABM();
        });
}

function LimpiarEncabezados() 
{
    let th = document.getElementById("thVehiculo");

    while (th.firstChild)
    {
        th.removeChild(th.firstChild);
    }
}

function LimpiarBody()
{
    let td = document.getElementById("tdVehiculo");

    while (td.firstChild) {
        td.removeChild(td.firstChild);
    }
}

async function EliminarVehiculo() 
{
    eliminar = document.getElementById("id").value;
    idBorrarObj = {id: eliminar};

    MostrarSpinner();

    try 
    {
        const response = await fetch(url,
        {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: 
            {
                'Content-Type': 'application/json'
            },

            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(idBorrarObj)
        });

        let resultado = await response.text();
        if (!response.ok) {
            throw new Error(resultado);
        }
        else 
        {
            listaDeVehiculos = listaDeVehiculos.filter(vehiculo => vehiculo.id != eliminar);            
            alert(resultado);

            CrearTabla();
        }

    }
    catch (error) 
    {
        console.error("ERROR. ", error);
        alert(error);
    }

    MostrarSpinner();
    CrearTabla();
}

function CambiarAtributos() 
{
    const tipo = document.getElementById('tipoVehiculo').value;
    const lblAtributo1 = document.getElementById('lblAtributo1');
    const lblAtributo2 = document.getElementById('lblAtributo2');
    const lblAtributo3 = document.getElementById('lblAtributo3');
    const lblAtributo4 = document.getElementById('lblAtributo4');
    const lblAtributo5 = document.getElementById('lblAtributo5');

    switch(tipo) 
    {
        case "auto":
            lblAtributo1.textContent = 'Modelo:';
            lblAtributo2.textContent = 'Año Fabricacion:';
            lblAtributo3.textContent = 'Velocidad Maxima:';
            lblAtributo4.textContent = 'Cantidad Puertas:';
            lblAtributo5.textContent = 'Asientos:';
            break;

        default:
            lblAtributo1.textContent = 'Modelo:';
            lblAtributo2.textContent = 'Año Fabricacion:';
            lblAtributo3.textContent = 'Velocidad Maxima:';
            lblAtributo4.textContent = 'Carga:';
            lblAtributo5.textContent = 'Autonomia:';
            break;     
    }
}

const url = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";

window.onload = CargarListaVehiculo();

let listaDeVehiculos  = new Array();

document.getElementById('agregar').addEventListener('click', function() 
{
    document.getElementById('form_abm').style.display = 'block';
    document.getElementById('formLista').style.display = 'none';
    document.getElementById("agregarAbm").style.display = 'block';  
    document.getElementById("modificarAbm").style.display = 'none';    
    document.getElementById("eliminarAbm").style.display = 'none';

    CambiarAtributos();
});

document.getElementById('agregarAbm').addEventListener('click', function() 
{
    document.getElementById('form_abm').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
});

document.getElementById('modificarAbm').addEventListener('click', function() 
{
    document.getElementById('form_abm').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';

    ReiniciarABM();
});

document.getElementById('eliminarAbm').addEventListener('click', function() 
{
    document.getElementById('form_abm').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';
    document.getElementById("agregarAbm").style.display = 'none';
    document.getElementById("eliminarAbm").style.display = 'block';
    document.getElementById("modificarAbm").style.display = 'none';    
    

    ReiniciarABM();
});

document.getElementById('cancelar').addEventListener('click', function() 
{
    document.getElementById('form_abm').style.display = 'none';
    document.getElementById('formLista').style.display = 'block';

    ReiniciarABM();
});