const dadosEstudos = {
    portugues: ["Gramática", "Interpretação de Texto", "Sintaxe", "Pontuação", "Morfologia"],
    matematica: ["Cálculo", "Geometria Plana", "Probabilidade e Estatística", "Álgebra", "Geometria Espacial", "Analise combinatoria", "Logica Matematica", "Matematica Basica"],
    fisica: ["Cinemática", "Dinâmica", "Estatica", "Hidrostática", "Termodinamica", "Ondulatoria e Otica", "Eletromagnetismo", "Relatividade", "Fisica Quantica", "Fisica Nuclear e de Particulas", "Fisica do Estado Solido"],
    quimica: ["Estequiometria", "Soluções", "Química Orgânica", "Termoquímica", "Equilíbrio Químico"],
    legislação: ["LDB", "ECA", "BNCC", "Didática e Avaliação", "Constitucional", "Penal", "Processo Penal", "Administrativo"]
};

function mostrarAssuntos(materia) {
    const container = document.getElementById('lista-assuntos');
    const progressoDiv = document.getElementById('progresso-geral');
    
    if (!container || !progressoDiv) return;

    progressoDiv.style.display = 'block';
    container.innerHTML = `<h2>Estudando: ${materia.toUpperCase()}</h2>`;

    const lista = dadosEstudos[materia];

    lista.forEach(assunto => {
        const idAssunto = `${materia}-${assunto.replace(/\s+/g, '')}`;
        const ultimaRevisao = localStorage.getItem(`data-${idAssunto}`);
        
        let infoData = 'Nunca revisado';
        if (ultimaRevisao) {
            infoData = `Última marcação: ${new Date(ultimaRevisao).toLocaleDateString()}`;
        }

        const divAssunto = document.createElement('div');
        divAssunto.className = `item-assunto`;
        divAssunto.innerHTML = `
            <h3>${assunto}</h3>
            <span class="data-revisao" style="font-size: 0.7rem; opacity: 0.6;">${infoData}</span>
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
        html += `<div class="quadrado ${check}" onclick="toggleCheck('${idUnico}', this, '${materia}', '${assunto}')"></div>`;
    }
    return html;
}

function toggleCheck(id, elemento, materia, assunto) {
    const estaMarcado = elemento.classList.toggle('check');
    localStorage.setItem(id, estaMarcado);
    
    const idAssunto = `${materia}-${assunto.replace(/\s+/g, '')}`;
    localStorage.setItem(`data-${idAssunto}`, new Date().toISOString());
    
    atualizarProgresso();
}

function atualizarProgresso() {
    const quadrados = document.querySelectorAll('.quadrado');
    const marcados = document.querySelectorAll('.quadrado.check');
    const barra = document.getElementById('barra-preenchimento');
    const texto = document.getElementById('status-porcentagem');
    
    if (quadrados.length > 0) {
        const porcentagem = Math.round((marcados.length / quadrados.length) * 100);
        barra.style.width = porcentagem + '%';
        texto.innerText = `${porcentagem}% concluído`;
    }
}

// Funções da Rotina (Textarea)
function salvarRotina(diaId) {
    const texto = document.getElementById(diaId).value;
    localStorage.setItem(`rotina-${diaId}`, texto);
}

function carregarRotina() {
    const dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
    dias.forEach(dia => {
        const salvo = localStorage.getItem(`rotina-${dia}`);
        const campo = document.getElementById(dia);
        if (salvo && campo) campo.value = salvo;
    });
}

const canvas = document.getElementById('canvas-fundo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Números e símbolos matemáticos
const letras = "0123456789πΣ∞√∫∆λ";
const tamanhoFonte = 16;
const colunas = canvas.width / tamanhoFonte;

const gotas = [];
for (let i = 0; i < colunas; i++) {
    gotas[i] = 1;
}

function desenharMatrix() {
    // Fundo semitransparente para criar o rastro
    ctx.fillStyle = "rgba(18, 18, 18, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffff"; // Cor ciano para os números
    ctx.font = tamanhoFonte + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const texto = letras.charAt(Math.floor(Math.random() * letras.length));
        ctx.fillText(texto, i * tamanhoFonte, gotas[i] * tamanhoFonte);

        if (gotas[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }
        gotas[i]++;
    }
}

// Atualiza a animação
setInterval(desenharMatrix, 50);

// Ajusta o tamanho se você redimensionar a janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
