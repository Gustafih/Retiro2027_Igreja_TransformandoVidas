// ===============================================
// CONFIGURAÇÃO GOOGLE APPS SCRIPT
// ===============================================


const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzbR8fCsrQ07jIWTa-6IMbhT-jN_9NiuqjvYay-xrIh0LsLe1jRSHioMzi5Hzzy9CZHKg/exec";



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



this.value =
valor;


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



const formMessage =
document.getElementById(
"formMessage"
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






form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



// =================================
// PEGAR DADOS
// =================================


const dadosForm =
new FormData(form);



let erros=[];



const nome =
dadosForm.get("nome");


const telefone =
dadosForm.get("telefone");


const igreja =
dadosForm.get("igreja");


const cargo =
dadosForm.get("cargo");




// =================================
// VALIDAÇÕES
// =================================



if(nome.length < 5){

erros.push(
"Digite seu nome completo"
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



if(!cargo){

erros.push(
"Selecione seu cargo"
);

}





if(erros.length > 0){


mostrarMensagem(

`
⚠️ Verifique os campos:

<br><br>

${erros.join("<br>")}

`,

"error"

);


return;


}






// =================================
// CARREGAMENTO
// =================================


submitButton.disabled=true;


buttonText.style.display="none";


loader.style.display="block";






// =================================
// ORGANIZAR DADOS
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
// ENVIAR GOOGLE
// =================================


try{


await fetch(

SCRIPT_URL,

{


method:"POST",


mode:"no-cors",


body:

JSON.stringify(dados)


}

);




// =================================
// SUCESSO
// =================================


mostrarMensagem(

`
✅ Inscrição realizada com sucesso!

<br><br>

Você será direcionado para o grupo oficial.

`,

"success"

);



setTimeout(()=>{


window.open(
LINK_GRUPO_WHATSAPP,
"_blank"
);



},2000);



form.reset();



}



catch(error){


console.error(error);



mostrarMensagem(

`
❌ Erro ao enviar inscrição.

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


formMessage.innerHTML =
mensagem;


formMessage.className =
"form-message "+tipo;


formMessage.style.display =
"block";

}