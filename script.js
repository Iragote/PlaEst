const dadosEstudos = {
    portugues: ["Gramática", "Interpretação de Texto", "Sintaxe", "Pontuação", "Morfologia"],
    matematica: ["Cálculo", "Geometria Plana", "Probabilidade e Estatística", "Álgebra", "Geometria Espacial", "Analise combinatoria", "Logica Matematica", "Matematica Basica"],
    fisica: ["Cinemática", "Dinâmica", "Estatica", "Hidrostática", "Termodinamica", "Ondulatoria e Otica", "Eletromagnetismo", "Relatividade", "Fisica Quantica", "Fisica Nuclear e de Particulas", "Fisica do Estado Solido"],
    quimica: ["Estequiometria", "Soluções", "Química Orgânica", "Termoquímica", "Equilíbrio Químico"],
    legislação: ["LDB", "ECA", "BNCC", "Didática e Avaliação", "Constitucional", "Penal", "Processo Penal", "Administrativo"]
};

// Funções de Interface
function mostrarAssuntos(materia) {
    const container = document.getElementById('lista-assuntos');
    const progressoDiv = document.getElementById('progresso-geral');
    if (!container || !progressoDiv) return;

    progressoDiv.style.display = 'block';
    container.innerHTML = `<h2>Estudando: ${materia.toUpperCase()}</h2>`;

    dadosEstudos[materia].forEach(assunto => {
        const divAssunto = document.createElement('div');
        divAssunto.className = 'item-assunto';
        divAssunto.innerHTML = `
            <h3>${assunto}</h3>
            <div class="quadrados-container">
                ${gerarQuadrados(materia, assunto)}
            </div>
        `;
        container.appendChild(divAssunto);
    });
    atualizarProgresso();
}

function gerarQuadrados(materia, assunto) {
    let html = '';
    for (let i = 1; i <= 10; i++) {
        const idUnico = `${materia}-${assunto.replace(/\s+/g, '')}-${i}`;
        const check = localStorage.getItem(idUnico) === 'true' ? 'check' : '';
        html += `<div class="quadrado ${check}" onclick="toggleCheck('${idUnico}', this)"></div>`;
    }
    return html;
}

function toggleCheck(id, elemento) {
    const estaMarcado = elemento.classList.toggle('check');
    localStorage.setItem(id, estaMarcado);
    atualizarProgresso();
}

function atualizarProgresso() {
    const quadrados = document.querySelectorAll('.quadrado');
    const marcados = document.querySelectorAll('.quadrado.check');
    const porcentagem = quadrados.length > 0 ? Math.round((marcados.length / quadrados.length) * 100) : 0;
    
    document.getElementById('barra-preenchimento').style.width = porcentagem + '%';
    document.getElementById('status-porcentagem').innerText = `${porcentagem}% concluído`;
}

// Rotina Semanal
function salvarRotina(diaId) {
    localStorage.setItem(`rotina-${diaId}`, document.getElementById(diaId).value);
}

function carregarDados() {
    ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(dia => {
        const salvo = localStorage.getItem(`rotina-${dia}`);
        if (salvo) document.getElementById(dia).value = salvo;
    });
}

// Animação de Fundo (Matrix)
const canvas = document.getElementById('canvas-fundo');
const ctx = canvas.getContext('2d');
let colunas, gotas;

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    colunas = canvas.width / 16;
    gotas = Array(Math.floor(colunas)).fill(1);
}

function desenharMatrix() {
    ctx.fillStyle = "rgba(18, 18, 18, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffff";
    ctx.font = "16px monospace";
    gotas.forEach((y, i) => {
        const texto = "0123456789πΣ∞√∫"[Math.floor(Math.random() * 15)];
        ctx.fillText(texto, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) gotas[i] = 0;
        gotas[i]++;
    });
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();
setInterval(desenharMatrix, 50);
window.onload = carregarDados;
