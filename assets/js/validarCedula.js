function EsCedula(elTexto) {
    var es = true;
    //validar longitud
    if (elTexto.length != 14) {
        es = false;
    } else {
        //verificar si tiene el formato correcto
        var RegExPattern = /^\d{13}[A-Z]{1}$/;
        if (!elTexto.match(RegExPattern)) {
            es = false;
        } else {
            //verificar si contiene una fecha válida
            let sFecha = elTexto.substring(3, 9);
            let sDia = elTexto.substring(3, 5);
            let sMes = elTexto.substring(5, 7);
            let sAnio = elTexto.substring(7, 9);
            let aa = parseInt(sAnio);
            let mm = parseInt(sMes);
            let dd = parseInt(sDia);
            if (aa >= 0 && aa <= 29) {
                aa += 2000;
            } else {
                aa += 1900;
            }
            var bisiesto = false;
            if (aa % 2 == 0) {
                if (aa % 4 == 0) {
                    bisiesto = true;
                }
            }
            if (mm < 1 || mm > 12) {
                es = false;
            } else {
                switch (mm) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        if (dd < 1 || dd > 31) {
                            return false;
                        }
                        break;
                    case 2:
                        if (bisiesto) {
                            if (dd < 1 || dd > 29) {
                                es = false;
                            }
                        } else {
                            if (dd < 1 || dd > 28) {
                                es = false;
                            }
                        }
                        break;
                    default:
                        if (dd < 1 || dd > 30) {
                            es = false;
                        }
                        break;
                }
            }
        }
    }
    return es;
}

function ValidarCedula(cadena) {
    if (EsCedula(cadena)) {
        alert('Es n° cedula es correcto!');
    } else {
        alert('¡El n° de cédula no es válido. Deben ser trece dígitos mas una letra al final, los caracteres del 4to al 9no deben representar una fecha válida!');
    }
    return false;
}