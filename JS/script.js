let alturaDaJanela = innerHeight;
let larguraDaJanela = innerWidth;
let pontuação = 0;
let vidas = 1;
let tempo = 60;
let tempoCriarMosquitos = 3000;


document.getElementById('iniciarJogo').onclick = function(){iniciarGame();};

function iniciarGame(){
    let dificuldade = document.getElementById('dificuldade').value;
    if(dificuldade === ''){
        alert('Selecione a dificuldade');
    } else{
        window.location.href = './paginas/jogo.html?' + dificuldade;
    }
}

function iniciar(){
    let nivel = window.location.search;
    nivel = nivel.replace('?', '');

    if(nivel === 'facil'){
        tempoCriarMosquitos = 3000;
    } else if(nivel === 'normal'){
        tempoCriarMosquitos = 1500;
    } else if(nivel === 'dificil'){
        tempoCriarMosquitos = 1000;
    }

    setInterval(function(){gerarMosca();}, tempoCriarMosquitos);
    let cronometro = setInterval(function(){diminuirTempo()}, 1000)
}

document.body.onresize = function(){redimencionamentoDeTela()};

function redimencionamentoDeTela(){
    alturaDaJanela = window.innerHeight;
    larguraDaJanela = window.innerWidth;
}

function gerarMosca(){
    if(document.getElementById('Mosquito')){
        document.getElementById('Mosquito').remove();
        if(vidas > 3){
            window.location.href = "../paginas/derrota.html";
        } else{
            document.getElementById('vida' + vidas).src = "../img/coracao_vazio.png";
            vidas++;
        }
    }

    let posicaoX = Math.floor(Math.random() * larguraDaJanela) - 95;
    let posicaoY = Math.floor(Math.random() * alturaDaJanela) - 95;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    let imagemMosquito = document.createElement('img');
    imagemMosquito.src = '../img/mosca.png';
    imagemMosquito.className = ladoAleatorio();
    imagemMosquito.style.position = 'absolute';
    imagemMosquito.id = 'Mosquito';
    imagemMosquito.onclick = function(){this.remove(); adicionarPontos()};

    tamanhoMosquito(imagemMosquito);

    imagemMosquito.style.left = posicaoX + 'px';
    imagemMosquito.style.top = posicaoY + 'px';

    document.body.appendChild(imagemMosquito);

}

function tamanhoMosquito(imagemMosquito){
    let tamanhoMosquito = Math.floor(Math.random() * 60) + 40;
    imagemMosquito.style.width = tamanhoMosquito + 'px';
    imagemMosquito.style.height = tamanhoMosquito + 'px';
}

function ladoAleatorio(){
    let ladoAleatorio = Math.round(Math.random());

    switch (ladoAleatorio) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
        default:
            return 'ladoA';
    }
}

function adicionarPontos(){
    pontuação++;
    document.getElementById('pontuacaoDoJogador').innerHTML = pontuação;
}

function diminuirTempo(){
    if(tempo > 0){
        document.getElementById('timer').innerHTML = tempo;
        tempo--;
    } else{
        window.location.href = "../paginas/vitoria.html";
    }
}
