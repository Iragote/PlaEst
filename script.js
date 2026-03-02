const dadosEstudos = {
    portugues: ["Gramática", "Interpretação de Texto", "Sintaxe", "Pontuação", "Morfologia"],
    matematica: ["Cálculo", "Geometria Plana", "Probabilidade e Estatística", "Álgebra", "Geometria Espacial", "Analise combinatoria", "Logica Matematica", "Matematica Basica"],
    fisica: ["Cinemática", "Dinâmica", "Estatica", "Hidrostática", "Termodinamica", "Ondulatoria e Otica", "Eletromagnetismo", "Relatividade", "Fisica Quantica", "Fisica Nuclear e de Particulas", "Fisica do Estado Solido"],
    quimica: ["Estequiometria", "Soluções", "Química Orgânica", "Termoquímica", "Equilíbrio Químico"],
    legislação: ["LDB", "ECA", "BNCC", "Didática e Avaliação", "Constitucional", "Penal", "Processo Penal", "Administrativo"],
    custom: JSON.parse(localStorage.getItem('assuntosCustomizados')) || []
};
function mostrarAssuntos(materia) {
    const container = document.getElementById('lista-assuntos');
    container.innerHTML = `<h2>Assuntos de ${materia.charAt(0).toUpperCase() + materia.slice(1)}</h2>`;

    dadosEstudos[materia].forEach(assunto => {
        const divAssunto = document.createElement('div');
        divAssunto.className = 'item-assunto';
        
        divAssunto.innerHTML = `
            <h3>${assunto}</h3>
            <div class="quadrados-container" id="grid-${materia}-${assunto}">
                ${gerarQuadrados(materia, assunto)}
            </div>
        `;
        container.appendChild(divAssunto);
    });
}

function gerarQuadrados(materia, assunto) {
    let html = '';
    // Criamos 15 quadrados para cada assunto (você pode aumentar)
    for (let i = 1; i <= 15; i++) {
        const idUnico = `${materia}-${assunto}-${i}`;
        const check = localStorage.getItem(idUnico) === 'true' ? 'check' : '';
        html += `<div class="quadrado ${check}" onclick="toggleCheck('${idUnico}', this)"></div>`;
    }
    return html;
}

function toggleCheck(id, elemento) {
    const estaMarcado = elemento.classList.toggle('check');
    localStorage.setItem(id, estaMarcado);
}

// Função para salvar o que você escreve em cada dia
function salvarRotina(diaId) {
    const texto = document.getElementById(diaId).value;
    localStorage.setItem(`rotina-${diaId}`, texto);
}

// Função para carregar a rotina ao abrir a página
function carregarRotina() {
    const dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
    dias.forEach(dia => {
        const salvo = localStorage.getItem(`rotina-${dia}`);
        if (salvo) {
            document.getElementById(dia).value = salvo;
        }
    });
}

// Chamar a função de carregar assim que o script rodar
carregarRotina();

// Mantenha suas funções anteriores (mostrarAssuntos, gerarQuadrados, etc.) abaixo daqui...