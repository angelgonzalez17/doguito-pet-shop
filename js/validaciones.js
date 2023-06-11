export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
   
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");    
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
};

const tipoDeErrores=[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
    ]

const mensajesDeError={
    nombre: {
        valueMissing: "Este campo no puede estar vacío",
    },
    email:{
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es valido",
    },
    password:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch:"Al menos 6 caracteres, maximo 12, debe contener una letra min, una letra may, un numero y sin caracteres especiales",
    },
    nacimiento:{
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros",
    },
    direccion: { 
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres",
    },
    ciudad: { 
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },
    estado: { 
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El Estado debe contener entre 10 y 40 caracteres",
    },
    

};





const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = ""
    tipoDeErrores.forEach( error =>{
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput], [error]);
            mensaje = mensajesDeError [tipoDeInput][error];
        }
    });
    return mensaje
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
    }
 
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas =  new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual  ;

};