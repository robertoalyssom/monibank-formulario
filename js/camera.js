const botaoIniciarCamera = document.querySelector('[data-video-botao]');
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');

const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagem = document.querySelector('[data-mensagem]');

const botaoEnviarFoto = document.querySelector('[data-enviar]');

let imagemURL = "";

botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo; // elemento vídeo recebendo fluxo de vídeo da câmera
});

// Capturar imagem e transformar em URL
botaoTirarFoto.addEventListener("click", () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // cria um canvas no contexto 2d/ e desenha uma img (que é o frame na hora do click)/ posição: 0 0 largura e altura do canvas(no HTML)
    
    imagemURL = canvas.toDataURL("image/jpg"); // transformar imagem do canvas em URL

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

// Salvar URL da imagem no localStorage
botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro"); // pegar objeto/string do localStorage
    const converteRetorno = JSON.parse(receberDadosExistentes); // converter para objt

    converteRetorno.imagem = imagemURL; // é criada a propriedade imagem no objt, então atribuímos a URL da imagem nela

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno)); // mandar objt para localStorage convertida em string novamente

    window.location.href = "./abrir-conta-form-3.html";
})

// console.log(navigator.mediaDevices.getUserMedia());

//Verifique se o elemento canvas tem um tamanho definido em seu HTML.
//Se o canvas não tiver um tamanho definido, o código canvas.width e canvas.height pode retornar 0, o que fará com que o desenho falhe.