const novaNota = document.getElementById("nova-nota");
const adicionarNota = document.getElementById("adicionar-nota");
const limparNotas = document.getElementById("limpar-notas");
const notasSalvas = document.getElementById("notas-salvas");

if (localStorage.getItem("notas")) {
    const notas = JSON.parse(localStorage.getItem("notas"));

    notas.forEach(function (nota, index) {
        criarNota(nota, index);
    });
}

adicionarNota.addEventListener("click", function () {
    const textoNota = novaNota.value.trim();
    if (textoNota !== '') {
        criarNota(textoNota);
        salvarNota();
        novaNota.value = '';
    }
});

limparNotas.addEventListener("click", function () {
    notasSalvas.innerHTML = '';
    localStorage.removeItem('notas');
});

function criarNota(texto, index) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");
    const inputCor = document.createElement("input");
    inputCor.type = "color";

    p.textContent = texto;
    p.classList.add("para-trocar-cor"); 
    botaoEditar.textContent = "Editar";
    botaoExcluir.textContent = "Excluir";

    div.appendChild(p);
    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);
    div.appendChild(inputCor);

    div.className = "nota";

    if (index !== undefined) {
        const notas = JSON.parse(localStorage.getItem("notas"));
        inputCor.value = notas[index].cor;
        div.style.backgroundColor = notas[index].cor;
    }
    notasSalvas.appendChild(div);

    botaoEditar.addEventListener("click", function () {
        editarNota(p, div, inputCor);
    });

    botaoExcluir.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir esta nota?")) {
            div.remove();
            salvarNota();
        }
    });

    // Adicione um event listener para o input de cor
    inputCor.addEventListener("change", function () {
        p.style.color = inputCor.value;
        salvarNota();
    });
}

function editarNota(p, div, inputCor) {
    const textareaEdicao = document.createElement("textarea");
    textareaEdicao.value = p.textContent;
    div.replaceChild(textareaEdicao, p);

    const botaoSalvar = document.createElement("button");
    botaoSalvar.textContent = "Salvar";
    div.appendChild(botaoSalvar);

    botaoSalvar.addEventListener("click", function () {
        p.textContent = textareaEdicao.value;
        div.replaceChild(p, textareaEdicao);
        div.removeChild(botaoSalvar);
        div.style.backgroundColor = inputCor.value;
        salvarNota();
    });
}

function salvarNota() {
    const notas = [];
    const divsNotas = notasSalvas.querySelectorAll(".nota");

    divsNotas.forEach(function (div) {
        const p = div.querySelector('p');
        const inputCor = div.querySelector("input");
        notas.push({
            texto: p.textContent,
            cor: inputCor.value
        });
    });

    localStorage.setItem("notas", JSON.stringify(notas));
}