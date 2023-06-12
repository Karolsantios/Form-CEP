// capturando os campos do formulário 
const end = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const cep = document.querySelector('#cep');


async function obterEndereco() {

    // Formatando a url para obter o cep digitado
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if (validarCep(cep.value)) {
        // realizando requisição no servidor.
        const dados = await fetch(url);

        // Convertendo dados da requisição para json
        const endereco = await dados.json();

        // Verificando se o obj endereco tem a chave erro
        if (endereco.hasOwnProperty("erro")) {
            end.value = "Endereço não encontrado!";
        }
        else {
            preencherFormulario(endereco);
        }

        
    }
    else {
        end.value = "CEP inválido!";
    }

}

// função responsável por preencher os campos
function reencherFormulario(endereco) {
    bairro.value = endereco.bairro;
    cidade.value = endereco.localidade;
    end.value = endereco.logradouro;
    estado.value = endereco.uf;
}

// função de validação do cep
function validarCep(cep) {
    if (cep.length == 8 && /^[0-9]+$/.test(cep)) {
        return true;
    }
    else {
        return false;
    }
}



// evento de saída de foco
cep.addEventListener("blur", obterEndereco);