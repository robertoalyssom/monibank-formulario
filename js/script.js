import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

// Armazenar no localStorage
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const listaRespostas = { // pegar todos os "valores", de cada "name", dos "elementos" "alvos" do "evento"
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); //setItem: salva valores chave-valor no navegador/ "cadastro": parâm.1, chave(uma string)/ JSON.stringify: converte objt JS em string

    window.location.href = "./abrir-conta-form-2.html"; // redireciona p/ página

    // Por conta do pattern, que estava errado, o evento submit falhava por que o CPF estaba invalido, porém não aparecia mensagem de erro, na tela 
});

// Eventos dos campos para validação
camposDoFormulario.forEach(campo => {
    campo.addEventListener("blur", () => verificaCampo(campo)); // campo como parâm. é o campo onde ocorre o event
    campo.addEventListener("invalid", evento => evento.preventDefault()); // parar evento de invalid
});

// lista com erros do ValiditState
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'tooShort',
    'customError'
]

// mensagens customizadas para cada tipo de erro, em cada campo.name
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

// Verificação para a validação dos campos
function verificaCampo(campo) {
    let mensagem = ""; // reset 1
    campo.setCustomValidity(""); // reset 2

    if (campo.name == "cpf" && campo.value.length >= 11) { // se o valor do campo, onde ocorre o evento é igual a cpf && o tamanho desse campo é maior ou igual que 11
        ehUmCPF(campo); // agora números do cpf sem caracteres especiais
    };
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo); // retorna true ou false
    };
    console.log(campo.validity)

    // Capturar mensagem de erro
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) { // se der algum dos erros da const tiposDeErro
            mensagem = mensagens[campo.name][erro] // acessando var mensagens.nome do campo.erro do tiposDeErro
        };
    });
    
    // Imprime na tela o erro capturado
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorDeImput = campo.checkValidity();

    if(!validadorDeImput) { // se o campo não estiver válido
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    };
};