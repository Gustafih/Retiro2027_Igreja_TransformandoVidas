// ===============================================
// CONFIGURAÇÃO GOOGLE APPS SCRIPT
// ===============================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz7ilbatD0DE-3a1oT6J7M-v9z4dsxRUTuMv4elRzXitcDPUmyvL77ZyKIjK4Hwl5hIeQ/exec";

const LINK_GRUPO_WHATSAPP =
"https://chat.whatsapp.com/COLE_SEU_LINK";


// ===============================================
// MENU MOBILE
// ===============================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});


// ===============================================
// MÁSCARA WHATSAPP
// ===============================================

const telefoneInput = document.getElementById("telefone");

if (telefoneInput) {
  telefoneInput.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, "");
    valor = valor.substring(0, 11);

    if (valor.length <= 11) {
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      valor = valor.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }

    this.value = valor;
  });
}


// ===============================================
// CAMPO LÍDER
// ===============================================

const cargoSelect = document.getElementById("cargo");
const liderAreaContainer = document.getElementById("liderAreaContainer");
const liderAreaInput = document.getElementById("liderArea");

if (cargoSelect) {
  cargoSelect.addEventListener("change", () => {
    if (cargoSelect.value === "Líder") {
      liderAreaContainer.style.display = "flex";
      liderAreaInput.required = true;
    } else {
      liderAreaContainer.style.display = "none";
      liderAreaInput.required = false;
      liderAreaInput.value = "";
    }
  });
}


// ===============================================
// FORMULÁRIO
// ===============================================

const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const buttonText = document.getElementById("buttonText");
const loader = document.getElementById("loader");
const whatsappCard = document.getElementById("whatsappCard");
const overlay = document.getElementById("overlay");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // =================================
  // PEGAR DADOS
  // =================================

  const dadosForm = new FormData(form);

  let erros = [];

  const nome = dadosForm.get("nome") || "";
  const telefone = dadosForm.get("telefone") || "";
  const igreja = dadosForm.get("igreja") || "";
  const cargo = dadosForm.get("cargo") || "";

  // =================================
  // VALIDAÇÕES
  // =================================

  if (nome.trim().length < 5) {
    erros.push("Digite seu nome completo");
  }

  // Validação com libphonenumber (precisa da tag <script> no HTML)
  if (typeof libphonenumber !== "undefined") {
    const numeroValido = libphonenumber.isValidPhoneNumber(telefone, "BR");
    if (!numeroValido) {
      erros.push("Número de telefone inválido. Verifique o DDD e o número");
    }
  } else {
    // Fallback caso a lib não carregue
    if (telefone.replace(/\D/g, "").length < 10) {
      erros.push("Telefone inválido");
    }
  }

  if (!igreja.trim()) {
    erros.push("Informe sua igreja");
  }

  if (!cargo) {
    erros.push("Selecione seu cargo");
  }

  if (erros.length > 0) {
    mostrarMensagem(
      `⚠️ Verifique os campos:<br><br>${erros.join("<br>")}`,
      "error"
    );
    return;
  }

  // =================================
  // CARREGAMENTO
  // =================================

  submitButton.disabled = true;
  buttonText.style.display = "none";
  loader.style.display = "block";

  // =================================
  // ORGANIZAR DADOS
  // =================================

  const dados = {
    data: new Date().toLocaleString("pt-BR"),
    nome: dadosForm.get("nome"),
    telefone: dadosForm.get("telefone"),
    dataNascimento: dadosForm.get("date"),
    cidade: dadosForm.get("cidade"),
    endereco: dadosForm.get("endereco"),
    bairro: dadosForm.get("bairro"),
    cristao: dadosForm.get("cristao"),
    retiroAnterior: dadosForm.get("retiroAnterior"),
    batizado: dadosForm.get("batizado"),
    igreja: dadosForm.get("igreja"),
    cargo: dadosForm.get("cargo"),
    liderArea: dadosForm.get("liderArea") || "Não se aplica",
    dormir: dadosForm.get("dormir")
  };

  // =================================
  // ENVIAR GOOGLE
  // =================================

  try {
    const resposta = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(dados),
      redirect: "follow"
    });

    const resultado = await resposta.json();

    if (resultado.status !== "ok") {
      throw new Error(resultado.mensagem || "Erro desconhecido");
    }

    // =================================
    // SUCESSO
    // =================================

    mostrarMensagem(
      `✅ Inscrição realizada com sucesso!`,
      "success"
    );

    if (whatsappCard) {
      whatsappCard.style.display = "block";
      overlay.style.display = "block";

      setTimeout(() => {
        whatsappCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 300);
    }

  } catch (error) {
    console.error(error);
    mostrarMensagem(
      `❌ Erro ao enviar inscrição.<br>Tente novamente.<br><small>${error.message}</small>`,
      "error"
    );

  } finally {
    submitButton.disabled = false;
    buttonText.style.display = "inline";
    loader.style.display = "none";
  }
});


// ===============================================
// BOTÃO DO CARD WHATSAPP (reset do form)
// ===============================================

if (whatsappCard) {
  const botaoZap = whatsappCard.querySelector(".whatsapp-card-button");

  if (botaoZap) {
    botaoZap.addEventListener("click", () => {
      form.reset();
      formMessage.style.display = "none";
      whatsappCard.style.display = "none";
    });
  }
}


// ===============================================
// MENSAGEM
// ===============================================

function mostrarMensagem(mensagem, tipo) {
  formMessage.innerHTML = mensagem;
  formMessage.className = "form-message " + tipo;
  formMessage.style.display = "block";
}