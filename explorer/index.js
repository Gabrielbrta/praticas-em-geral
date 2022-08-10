
  const respostas = [
    "Certeza!",
    "Não tenho tanta certeza.",
    "É decididamente assim.",
    "Não conte com isso.",
    "Sem dúvidas!",
    "Pergunte novamente mais tarde.",
    "Sim, definitivamente!",
    "Minha resposta é não.",
    "Você pode contar com isso.",
    "Melhor não te dizer agora.",
    "A meu ver, sim.",
    "Minhas fontes dizem não.",
    "Provavelmente.",
    "Não é possível prever agora.",
    "Perspectiva boa.",
    "As perspectivas não são tão boas.",
    "Sim.",
    "Concentre-se e pergunte novamente.",
    "Sinais apontam que sim.",
  ]

function initRevealDestiny() {
  const button = document.querySelector('button');
  const input = document.querySelector('input');
  const respostaElement = document.querySelector('#resposta');

  const randomAnswer = () => {
    return Math.floor(Math.random() * respostas.length);
  }

  const createElementAnswer = () => {
    respostaElement.style.opacity = .9;
    respostaElement.innerHTML = `${input.value} <div>${respostas[randomAnswer()]}</div>`;
    setTimeout(() => {
      respostaElement.style.opacity = 0;
      button.removeAttribute('disabled');
    }, 3000)
  }

  const edgeElement = () => {
    if (input.value === '') input.classList.add('vazio')
    else createElementAnswer();
  }  

  const handleEvent = () => {
    button.setAttribute('disabled', true);
    edgeElement();
  }
  button.addEventListener('click', handleEvent)
}
initRevealDestiny();
