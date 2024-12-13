let f = document.getElementsByClassName("h-card h-card_md h-card_comments");
let myArray = [];
let myArray2 = [];
let itemsTimeAwaitingUserInfo = [];
let itemsTimeOpen = [];
let regex = /\b(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})\b/;

for (let i = 0; i < f.length; i++) {
    myArray.push(f[i].innerText);



    if (f[i].innerText.includes("Automatically Resolved because all associated tasks are closed complete or cancelled")) {
        myArray2.push(f[i]);
    }

    if (f[i].innerText.includes("Awaiting User InfowasAwaiting Work Order")) {
        itemsTimeAwaitingUserInfo.push(f[i].innerText.match(regex)[0]);
    }

    if (f[i].innerText.includes("Awaiting Work OrderwasAwaiting User Info")) {
        itemsTimeOpen.push(f[i].innerText.match(regex)[0]);
    }
}

let match = myArray[myArray.length - 1].match(regex);
let dateCreationTicket = match[0];

let match2 = myArray2[0].innerText.match(regex);
let dateCloseTicket = match2[0];

dateCreationTicket;
dateCloseTicket;
itemsTimeAwaitingUserInfo;
itemsTimeOpen;
let wholeArray = [];
let i = 0;
while (i < itemsTimeAwaitingUserInfo.length) {
    wholeArray.push(itemsTimeOpen[i]);
    wholeArray.push(itemsTimeAwaitingUserInfo[i]);
    i++;
}
wholeArray.unshift(dateCloseTicket);
wholeArray.push(dateCreationTicket);
console.log(wholeArray);

let wholeArrayDateFormat = wholeArray.map((item) => {
    //Fecha en formato "dd/mm/yyyy hh:mm:ss" 
    let fechaStr = item;
    // Convertir la cadena de texto a un objeto Date 
    let partes = fechaStr.split(/[\s/:]/);
    let fecha = new Date(partes[2], partes[1] - 1, partes[0], partes[3], partes[4], partes[5]);

    let itemsMilisegundos = fecha.getTime();
    return itemsMilisegundos;

});

//cambios
console.log(wholeArrayDateFormat[0] < wholeArrayDateFormat[1] );
let timeToday = new Date().getTime();
console.log(timeToday);
if(wholeArrayDateFormat[0] < wholeArrayDateFormat[1] ){
    wholeArrayDateFormat.shift();
    wholeArrayDateFormat.unshift(timeToday);
}
console.log(wholeArrayDateFormat);
//cambios

let rest = [];
for (let i = 0; i < itemsTimeAwaitingUserInfo.length + 1; i++) {
    rest.push((wholeArrayDateFormat[i * 2]) - (wholeArrayDateFormat[i * 2 + 1]));
}

let sum = rest.reduce((a, b) => {
    return a + b
});

let diferenciaSegundos = Math.floor(sum / 1000);
let dias = Math.floor(diferenciaSegundos / (24 * 3600));
diferenciaSegundos = diferenciaSegundos % (24 * 3600);
let horas = Math.floor(diferenciaSegundos / 3600);
diferenciaSegundos = diferenciaSegundos % 3600;
let minutos = Math.floor(diferenciaSegundos / 60);
let segundos = diferenciaSegundos % 60;
// Formatear para que siempre muestre dos dígitos 
dias = dias.toString().padStart(2, '0');
horas = horas.toString().padStart(2, '0');
minutos = minutos.toString().padStart(2, '0');
segundos = segundos.toString().padStart(2, '0');
let resultado = `${dias} días ${horas}:${minutos}:${segundos}`;
console.log(resultado);