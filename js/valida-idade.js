export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value); // armazenando data de nascimento do usuário / sem new, Date retorna data atual?!
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade (qualquer mensagem)'); // tanto CPF quanto RG possuem validações customizadas / precisamos criar mensagens customizadas, usando setCustomValidity, transformamos o customError (da lista de ValidityState) em true / é para comfirmar p/ o JS que tem um erro
    }
};

function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
};
