// ===============================================
// MENU MOBILE
// ===============================================

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });



// ===============================================
// MÁSCARA DO WHATSAPP
// ===============================================

const telefone =
    document.getElementById("telefone");


telefone.addEventListener("input", function () {

    let value =
        this.value.replace(/\D/g, "");

    if (value.length > 11) {
        value =
            value.slice(0, 11);
    }


    if (value.length > 10) {

        value =
            value.replace(
                /^(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
            );

    }

    else if (value.length > 6) {

        value =
            value.replace(
                /^(\d{2})(\d{4})(\d+)/,
                "($1) $2-$3"
            );

    }

    else if (value.length > 2) {

        value =
            value.replace(
                /^(\d{2})(\d+)/,
                "($1) $2"
            );

    }

    else {

        value =
            value.replace(
                /^(\d*)/,
                "($1"
            );

    }


    this.value = value;

});



// ===============================================
// GOOGLE APPS SCRIPT
// ===============================================

// DEPOIS VAMOS COLOCAR A URL GERADA
// PELO GOOGLE APPS SCRIPT AQUI.

const SCRIPT_URL =
    "COLE_AQUI_A_URL_DO_GOOGLE_APPS_SCRIPT";



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



// ===============================================
// ENVIO
// ===============================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ---------------------------------------
        // VERIFICAÇÃO DA URL
        // ---------------------------------------

        if (
            SCRIPT_URL.includes(
                "COLE_AQUI"
            )
        ) {

            mostrarMensagem(
                "O formulário está pronto, mas ainda precisamos conectar o Google Planilhas.",
                "error"
            );

            return;

        }



        // ---------------------------------------
        // CARREGAMENTO
        // ---------------------------------------

        submitButton.disabled =
            true;

        buttonText.style.display =
            "none";

        loader.style.display =
            "block";

        formMessage.className =
            "form-message";



        // ---------------------------------------
        // CAPTURA DOS DADOS
        // ---------------------------------------

        const formData =
            new FormData(form);


        const dados = {

            nome:
                formData.get("nome"),

            telefone:
                formData.get("telefone"),

            idade:
                formData.get("idade"),

            endereco:
                formData.get("endereco"),

            bairro:
                formData.get("bairro"),

            cidade:
                formData.get("cidade"),

            cristao:
                formData.get("cristao"),

            retiroAnterior:
                formData.get(
                    "retiroAnterior"
                ),

            batizado:
                formData.get(
                    "batizado"
                ),

            transporte:
                formData.get(
                    "transporte"
                ),

            igreja:
                formData.get(
                    "igreja"
                ),

            cargo:
                formData.get(
                    "cargo"
                ) || "Não informado",

            dormir:
                formData.get(
                    "dormir"
                )

        };



        // ---------------------------------------
        // ENVIO PARA GOOGLE
        // ---------------------------------------

        try {

            await fetch(
                SCRIPT_URL,
                {

                    method:
                        "POST",

                    mode:
                        "no-cors",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            dados
                        )

                }
            );


            mostrarMensagem(
                "Inscrição realizada com sucesso! Deus abençoe você. Nos vemos no Retiro 2027! ✨",
                "success"
            );


            form.reset();


            setTimeout(() => {

                formMessage.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "center"
                });

            }, 100);


        }

        catch (error) {

            console.error(error);


            mostrarMensagem(
                "Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente.",
                "error"
            );

        }

        finally {

            submitButton.disabled =
                false;

            buttonText.style.display =
                "inline";

            loader.style.display =
                "none";

        }

    }
);



// ===============================================
// FUNÇÃO DE MENSAGEM
// ===============================================

function mostrarMensagem(
    mensagem,
    tipo
) {

    formMessage.textContent =
        mensagem;

    formMessage.className =
        `form-message ${tipo}`;

}