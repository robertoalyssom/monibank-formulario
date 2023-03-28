// função que retira os caracteres especiais do CPF, e verifica se cpf existe
export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    console.log(cpf)
    
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) { // se alguma dessa funções retornar true...
        campo.setCustomValidity('Esse cpf não existe (qualque mensagem p/ o js detectar erro)'); // customError == true
    } else {
        console.log("Esse CPF existe")
    };
};

// função de validação de números repetidos
function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf); // se cpf é igual à algum númerosRepetidos, retorna true
};

// função que cria a validação do primeiro dígito do CPF
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for(let i = 0; i < 9; i++) {
        soma += cpf[i] * multiplicador; // cada número do CPF * o multiplicador é acrescentado e somado somado a ele msm durante o loop/ a cada loop o multiplicador decresce 1
        multiplicador--;
    };

    soma =  (soma * 10) % 11;

    if(soma == 10 || soma == 11) {
        soma = 0;
    };

    return soma != cpf[9]; // verifica se o valor de soma for e diferente do décimo dígito do cpf, retorna false se o décimo número digitado pelo user estiver correta / compara valor de soma com cpf[9] digitado
};

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11; // +1 pq aumentou o número de dígitos a ser multiplicado

    for(let i = 0; i < 10; i++) {
        soma += cpf[i] * multiplicador;
        multiplicador--;
    };

    soma =  (soma * 10) % 11;

    if(soma == 10 || soma == 11) {
        soma = 0;
    };

    return soma != cpf[10];
};