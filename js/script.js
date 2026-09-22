// ===============================================
// CONFIGURAÇÃO POWER AUTOMATE / EXCEL ONLINE
// ===============================================

// Depois você vai colocar aqui o link do Webhook
// criado no Power Automate

const EXCEL_WEBHOOK_URL =
"https://COLE_AQUI_SEU_WEBHOOK";


const LINK_GRUPO_WHATSAPP =
"https://chat.whatsapp.com/COLE_SEU_LINK";




// ===============================================
// MENU MOBILE
// ===============================================

const menuToggle =
document.getElementById("menuToggle");


const nav =
document.getElementById("nav");


if(menuToggle){

menuToggle.addEventListener(
"click",
()=>{

nav.classList.toggle("active");

});

}



document
.querySelectorAll(".nav a")
.forEach(link=>{

link.addEventListener(
"click",
()=>{

nav.classList.remove("active");

});

});





// ===============================================
// MÁSCARA WHATSAPP
// ===============================================

const telefone =
document.getElementById("telefone");


if(telefone){


telefone.addEventListener(
"input",
function(){


let valor =
this.value.replace(/\D/g,"");


valor =
valor.substring(0,11);



if(valor.length <=10){


valor =
valor.replace(
(/^(\d{2})(\d)/),
"($1) $2"
);


valor =
valor.replace(
/(\d{4})(\d)/,
"$1-$2"
);


}

else{


valor =
valor.replace(
(/^(\d{2})(\d{5})(\d)/),
"($1) $2"
);


valor =
valor.replace(
/(\d{4})(\d)/,
"$1-$2"
);


}



this.value = valor;


});


}






// ===============================================
// CAMPO LÍDER
// ===============================================


const cargo =
document.getElementById("cargo");


const liderAreaContainer =
document.getElementById(
"liderAreaContainer"
);


const liderArea =
document.getElementById(
"liderArea"
);



if(cargo){


cargo.addEventListener(
"change",
()=>{


if(
cargo.value === "Líder"
){


liderAreaContainer.style.display =
"flex";


liderArea.required =
true;


}

else{


liderAreaContainer.style.display =
"none";


liderArea.required =
false;


liderArea.value="";


}


});


}







// ===============================================
// FORMULÁRIO
// ===============================================


const form =
document.getElementById(
"registrationForm"
);



const submitButton =
document.getElementById(
"submitButton"
);


const buttonText =
document.getElementById(
"buttonText"
);


const loader =
document.getElementById(
"loader"
);


const formMessage =
document.getElementById(
"formMessage"
);



const successScreen =
document.getElementById(
"successScreen"
);



const successName =
document.getElementById(
"successName"
);







form.addEventListener(
"submit",
async(event)=>{


event.preventDefault();



// =================================
// VALIDAÇÃO
// =================================


let erros=[];


const dadosForm =
new FormData(form);



const nome =
dadosForm.get("nome");


const telefone =
dadosForm.get("telefone");


const igreja =
dadosForm.get("igreja");


const cargoSelecionado =
dadosForm.get("cargo");



if(nome.length < 5){

erros.push(
"Informe seu nome completo"
);

}



if(
telefone.replace(/\D/g,"").length < 10
){

erros.push(
"Telefone inválido"
);

}



if(!igreja){

erros.push(
"Informe sua igreja"
);

}



if(!cargoSelecionado){

erros.push(
"Selecione seu cargo na igreja"
);

}





if(erros.length>0){


mostrarMensagem(
`
⚠️ Corrija os seguintes campos:

<br><br>

${erros.join("<br>")}

`,
"error"
);


return;


}





// =================================
// BOTÃO CARREGANDO
// =================================


submitButton.disabled=true;


buttonText.style.display="none";


loader.style.display="block";






// =================================
// ORGANIZAR DADOS PARA EXCEL
// =================================



const dados = {


data:

new Date()
.toLocaleString(
"pt-BR"
),


nome:

dadosForm.get("nome"),



telefone:

dadosForm.get("telefone"),



dataNascimento:

dadosForm.get("date"),



cidade:

dadosForm.get("cidade"),



endereco:

dadosForm.get("endereco"),



bairro:

dadosForm.get("bairro"),



cristao:

dadosForm.get("cristao"),



retiroAnterior:

dadosForm.get("retiroAnterior"),



batizado:

dadosForm.get("batizado"),



igreja:

dadosForm.get("igreja"),



cargo:

dadosForm.get("cargo"),



liderArea:

dadosForm.get("liderArea")
||
"Não se aplica",



dormir:

dadosForm.get("dormir")

};







// =================================
// ENVIO PARA EXCEL ONLINE
// =================================



try{


await fetch(

EXCEL_WEBHOOK_URL,

{

method:"POST",


headers:{

"Content-Type":
"application/json"

},


body:

JSON.stringify(dados)


}

);





// ESCONDE FORMULÁRIO

form.style.display="none";



// MOSTRA SUCESSO


successName.innerHTML=

`
Obrigado,
<b>${dados.nome}</b>!
`;



successScreen.style.display=
"flex";



}

catch(error){


console.error(error);



mostrarMensagem(

`
❌ Não foi possível concluir sua inscrição.

Tente novamente.

`,

"error"

);



}



finally{


submitButton.disabled=false;


buttonText.style.display="inline";


loader.style.display="none";


}



});







// ===============================================
// MENSAGEM
// ===============================================


function mostrarMensagem(
mensagem,
tipo
){


formMessage.innerHTML=
mensagem;


formMessage.className=
"form-message "+tipo;


formMessage.style.display=
"block";


}