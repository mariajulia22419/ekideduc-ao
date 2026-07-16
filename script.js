// CONFIGURAÇÕES GERAIS DE MATÉRIAS
const materiasFundamental = ["Matemática", "Português", "Educação Física", "Geografia", "História", "Arte", "Inglês", "Espanhol"];
const materiasMedio = ["Português", "Matemática", "Arte", "Geografia", "História", "Educação Física", "Educação Financeira", "Física", "Química", "Biologia", "Sociologia", "Filosofia"];

// BASE DE DADOS DOS JOGOS (EXEMPLO DE SUPORTE AOS JOGOS)
// Para atingir o objetivo de 10 jogos por matéria, cada matéria receberá um array de perguntas dinâmicas geradas ou salvas abaixo.
const bancoDeQuestoes = {
    "Matemática": [
        { q: "Quanto é 5 + 7?", options: ["10", "11", "12", "13"], correct: "12" },
        { q: "Qual o valor de 3 x 4?", options: ["12", "7", "15", "9"], correct: "12" },
        { q: "Se João tem 10 maçãs e dá 3, com quantas fica?", options: ["7", "6", "8", "5"], correct: "7" }
        // Insira mais perguntas aqui para atingir os 10 jogos/fases por matéria
    ],
    "Português": [
        { q: "Qual o antônimo de 'Alto'?", options: ["Baixo", "Grande", "Largo", "Longe"], correct: "Baixo" },
        { q: "Identifique o substantivo: 'O cachorro correu'.", options: ["correu", "cachorro", "O", "rápido"], correct: "cachorro" }
    ]
};

// CONTROLE DE ACESSIBILIDADE
let fontSizeMultiplier = 1;
function changeFontSize(direction) {
    fontSizeMultiplier += direction * 0.1;
    if (fontSizeMultiplier < 0.8) fontSizeMultiplier = 0.8;
    if (fontSizeMultiplier > 1.6) fontSizeMultiplier = 1.6;
    document.documentElement.style.setProperty('--font-multiplier', fontSizeMultiplier);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function activateSpecialMode() {
    document.body.classList.toggle('special-mode');
    alert("Espaço Especial Inclusivo Ativado! Fonte amigável e cores de baixo impacto visual.");
}

// NAVEGAÇÃO DE SEÇÕES
function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// SELEÇÃO DE ANO / ENSINO
function selectLevel(level) {
    showSection('jogos');
    const container = document.getElementById('materias-grid');
    container.classList.remove('hidden');
    document.getElementById('game-arena').classList.add('hidden');
    container.innerHTML = ''; // limpa grid anterior

    const materias = (level === 'fundamental') ? materiasFundamental : materiasMedio;
    document.getElementById('jogos-titulo').innerText = `Matérias do Ensino ${level === 'fundamental' ? 'Fundamental' : 'Médio'}`;

    materias.forEach(materia => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${materia}</h3><p>Clique para Jogar</p>`;
        card.onclick = () => startSubjectGame(materia);
        container.appendChild(card);
    });
}

// MOTOR DO JOGO
let currentQuestionIndex = 0;
let score = 0;
let currentSubject = "";

function startSubjectGame(materia) {
    currentSubject = materia;
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('materias-grid').classList.add('hidden');
    document.getElementById('game-arena').classList.remove('hidden');
    document.getElementById('game-title').innerText = `Jogo de ${materia}`;

    loadQuestion();
}

function loadQuestion() {
    // Busca as questões da matéria correspondente. Caso não tenha questões cadastradas no banco, gera uma genérica.
    const questoes = bancoDeQuestoes[currentSubject] || [
        { q: `Pergunta Genérica de ${currentSubject} - Quanto é 1 + 1?`, options: ["1", "2", "3", "4"], correct: "2" }
    ];

    if (currentQuestionIndex >= questoes.length) {
        // Fim de jogo da matéria
        document.getElementById('game-box').innerHTML = `<h3>Parabéns! Você completou o jogo de ${currentSubject}!</h3>`;
        document.getElementById('game-options').innerHTML = '';
        return;
    }

    const questaoAtual = questoes[currentQuestionIndex];
    document.getElementById('game-question').innerText = questaoAtual.q;
    document.getElementById('game-score').innerText = `Pontuação: ${score}`;

    const optionsContainer = document.getElementById('game-options');
    optionsContainer.innerHTML = '';

    questaoAtual.options.forEach(opcao => {
        const btn = document.createElement('button');
        btn.innerText = opcao;
        btn.onclick = () => checkAnswer(opcao, questaoAtual.correct);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
        alert("Correto! 🎉");
    } else {
        alert(`Ops! A resposta correta era: ${correct}`);
    }
    currentQuestionIndex++;
    loadQuestion();
}

function backToSubjects() {
    document.getElementById('game-arena').classList.add('hidden');
    document.getElementById('materias-grid').classList.remove('hidden');
}
