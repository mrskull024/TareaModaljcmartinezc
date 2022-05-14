var btnGuardar = document.getElementById("btnSave");
var btnActualizar = document.getElementById("btnUpdate");
var tablaDatos = document.getElementById("tablaRegistros");
var cedula = document.getElementById("cedula");
var nombres = document.getElementById("nombres");
var apellidos = document.getElementById("apellidos");
var fechaNac = document.getElementById("fechaNac");
var edad = document.getElementById("edad");
var departamento = document.getElementById("departamento");

//evitamos los guiones y hacemos los otros cálculos
//en paz 
function quitarGuion(){
    let Ced = document.getElementById("cedula").value;
    console.log(Ced);
    let valor = Ced.replace(/-/g, "");
    console.log(valor);
    cedula.value=valor;
}

//funcion para sacar la edad en base a la fecha de la cedula
function calcularEdad(){
    let noCedula = document.getElementById("cedula").value;
    let sacarDia = noCedula.substr(3,2);
    let sacarMes = noCedula.substr(5,2);
    let sacarAnio = noCedula.substr(7,2);
    let symbol = "/";
    var fechaCompleta = sacarDia.concat(symbol)+sacarMes.concat(symbol)+sacarAnio;
    console.log(fechaCompleta);
    let pleca = fechaCompleta.split("/");
    let convertirFecha = new Date(pleca[2], pleca[1] - 1, pleca[0]);
    let aniosDif = Date.now() - convertirFecha.getTime();
    let aniosResult = new Date(aniosDif);
    let edadCalculada = Math.abs(aniosResult.getUTCFullYear() - 1970);
    //return Math.abs(aniosResult.getUTCFullYear() - 1970);
    let inputEdad = document.getElementById("edad");
    inputEdad.value = edadCalculada;
}

//funcion para sacar el departamento en base al primer digito de la cedula
function determinarZona(){
    let noCedula = document.getElementById("cedula").value;
    let primerDigito = noCedula.substr(0,1);
    let dept = document.getElementById("departamento");
    switch(primerDigito){
        case "0":
            dept.value = "Capital";
        break;
        case "1":
            dept.value = "Zona 1";
        break;
        case "2":
            dept.value = "Zona 2";
        break;
        case "3":
            dept.value = "Zona 3";
        break;
        case "4":
            dept.value = "Zona 4";
        break;
    }
}

function getSexValue(radioBtn){
    let radio = document.getElementsByName(radioBtn);
    let selectedOp = "";
    for (let i=0, length = radio.length; i<length; i++){
        if(radio[i].checked){
            selectedOp = radio[i].value;
            break;
        }
    }
    return selectedOp;
}

function getPasatiempos(checkboxPs){
    let checkB = document.getElementsByName(checkboxPs);
    let checkedOp = "";
    for (let i=0; i<checkB.length; i++){
        if(checkB[i].checked){
            checkedOp = checkedOp.concat(checkB[i].value).concat(", ");
        }
    }
    checkedOp = checkedOp.trim().substring(0,checkedOp.trim().length - 1);
    return checkedOp.length > 0 ? checkedOp:"";
}

function insertData(){
    if(cedula.value !==null && cedula.value !==undefined && cedula.value.toString().length == 14){
        let tbl = tablaDatos.insertRow(1);
        let data1 = tbl.insertCell(0);
        let data2 = tbl.insertCell(1);
        let data3 = tbl.insertCell(2);
        let data4 = tbl.insertCell(3);
        let data5 = tbl.insertCell(4);
        let data6 = tbl.insertCell(5);
        let data7 = tbl.insertCell(6);
        let data8 = tbl.insertCell(7);
        let dataAct = tbl.insertCell(8);
        if(getSexValue("radioSx") == "Masculino"){
            data1.innerHTML = "<img src=assets/img/male.svg>"
        }
        else if(getSexValue("radioSx") == "Femenino"){
            data1.innerHTML = "<img src=assets/img/female.svg>"
        }
        //data1.innerHTML = "Temp String";
        data2.innerHTML = cedula.value;
        data3.innerHTML = nombres.value
        data4.innerHTML = apellidos.value;
        data5.innerHTML = getSexValue("radioSx");
        data6.innerHTML = edad.value;
        data7.innerHTML = departamento.value;
        data8.innerHTML = getPasatiempos("chkPasatiempo");

        //let btnActions = "<button name='EditBtn' onclick='ShowModal(this)'>Editar</button>";
        let btnActions = "<button name='EditBtn' onclick='ShowModal(this)'><img src='assets/img/pen.svg'></button>";
        //btnActions = btnActions.concat("&nbsp;").concat("<button name='DelBtn' onclick='deleteData(this)'>Dar Baja</button>");
        btnActions = btnActions.concat("&nbsp;").concat("<button name='DelBtn' onclick='deleteData(this)'><img src='assets/img/trash.svg'></button>");
        dataAct.innerHTML = btnActions;

        let hideModal = document.getElementById("modalBody");
        hideModal.style.display = "none";
    }
}

function deleteData(data){
    let i = data.parentNode.parentNode.rowIndex;
    tablaDatos.deleteRow(i);
}

function ShowModal(data){
    let showModal = document.getElementById("modalBody");
    showModal.style.display = "block";

    selectedRowIndex = data.parentNode.parentNode.rowIndex;
    cedula.value = tablaDatos.rows[selectedRowIndex].cells[1].innerHTML.toString();
    nombres.value = tablaDatos.rows[selectedRowIndex].cells[2].innerHTML.toString();
    apellidos.value = tablaDatos.rows[selectedRowIndex].cells[3].innerHTML.toString();
    let sexo = tablaDatos.rows[selectedRowIndex].cells[4].innerHTML.toString();
    SelectRadioOptInModal("radioSx", sexo);
    edad.value = tablaDatos.rows[selectedRowIndex].cells[5].innerHTML.toString();
    departamento.value = tablaDatos.rows[selectedRowIndex].cells[6].innerHTML.toString();
    let pasatiemposString = tablaDatos.rows[selectedRowIndex].cells[7].innerHTML.toString();
    let pasatiemposArray = pasatiemposString.split(",");
    for(var z=0;z<pasatiemposArray.length;z++){
        SelectCheckInModal("chkPasatiempo", pasatiemposArray[z].trim());
    }
}

function SelectRadioOptInModal(radioBtn, opt){
    let radio = document.getElementsByName(radioBtn);
    for (let i=0, length = radio.length; i<length; i++){
        if(radio[i].value = opt){
            radio[i].checked = true;
            break;
        }
    }
    return;
}

function SelectCheckInModal(checkboxPs, opt){
    let checkB = document.getElementsByName(checkboxPs);
    for (let i=0; i<checkB.length; i++){
       if(checkB[i].value == opt){
            checkB[i].checked = true;
       }
    }
    return;
}

function updateData(){
    //tablaDatos.rows[selectedRowIndex].cells[0].innerHTML ="String Value"; 
    if(getSexValue("radioSx") == "Masculino"){
        tablaDatos.rows[selectedRowIndex].cells[0].innerHTML = "<img src=assets/img/male.svg>"
    }
    else if(getSexValue("radioSx") == "Femenino"){
        tablaDatos.rows[selectedRowIndex].cells[0].innerHTML = "<img src=assets/img/female.svg>"
    }
    tablaDatos.rows[selectedRowIndex].cells[1].innerHTML = cedula.value; 
    tablaDatos.rows[selectedRowIndex].cells[2].innerHTML = nombres.value;
    tablaDatos.rows[selectedRowIndex].cells[3].innerHTML = apellidos.value;
    tablaDatos.rows[selectedRowIndex].cells[4].innerHTML = getSexValue("radioSx");
    tablaDatos.rows[selectedRowIndex].cells[5].innerHTML = edad.value;
    tablaDatos.rows[selectedRowIndex].cells[6].innerHTML = departamento.value;
    tablaDatos.rows[selectedRowIndex].cells[7].innerHTML = getPasatiempos("chkPasatiempo");

    let hideModal = document.getElementById("modalBody");
        hideModal.style.display = "none";
}