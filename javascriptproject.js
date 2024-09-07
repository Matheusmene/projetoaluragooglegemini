// Função para normalizar a string removendo acentos e caracteres especiais
// .normalize('NFD') quebra os caracteres acentuados em seus componentes básicos
// O método .replace() remove os diacríticos (acentos) usando uma expressão regular
const normalizeString = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Função de pesquisa que filtra os resultados com base no termo pesquisado
function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    // Obtém o valor digitado no campo de pesquisa e o normaliza para evitar problemas com acentuação
    let campoPesquisa = normalizeString(document.getElementById("campo-pesquisa").value.toLowerCase());

    // Verifica se o campo de pesquisa está vazio, caso esteja, exibe uma mensagem de erro
    if (campoPesquisa === "") {
        section.innerHTML = "<p class='mensagem-erro'>Esse Planeta não pertence ao sistema solar.</p>";
        return;
    }

    // Inicializa uma string vazia para armazenar o HTML dos resultados
    let resultados = "";

    // Variável booleana para verificar se algum resultado foi encontrado
    let encontrouResultado = false;

    // Itera sobre a lista de dados (assumindo que a lista "dados" contém os planetas)
    for (let dado of dados) {
        // Normaliza o título dos dados para compará-los com o termo de pesquisa (ignorando acentos)
        if (normalizeString(dado.titulo.toLowerCase()).includes(campoPesquisa)) {
            encontrouResultado = true; // Se encontrar um resultado, marca como verdadeiro

            // Adiciona um novo bloco HTML para o resultado encontrado
            resultados += `
                <div class="item-resultado">
                    <h1>${dado.titulo}</h1>
                    <img class="resultado-imagem" src="${dado.imagem}" alt="${dado.titulo}">
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a class="saiba-mais" href="${dado.link}" target="_blank">Saiba Mais</a>
                </div>
            `;
        }
    }

    // Se encontrou algum resultado, exibe os resultados, caso contrário, mostra uma mensagem de erro
    section.innerHTML = encontrouResultado ? resultados : "<p class='mensagem-erro'>Esse Planeta não pertence ao sistema solar.</p>";
}

// Adiciona o evento "keypress" para permitir que a pesquisa seja feita ao pressionar a tecla "Enter"
document.getElementById("campo-pesquisa").addEventListener("keypress", function(event) {
    // Verifica se a tecla pressionada é Enter (código 13)
    if (event.key === "Enter") {
        event.preventDefault(); // Evita o comportamento padrão do Enter (que pode submeter formulários)
        pesquisar(); // Chama a função de pesquisa
    }
});
