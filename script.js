const lista = document.querySelector('#lista-tarefas');
function criaElemento(elemento) { // função pra criar elemento;
  const element = document.createElement(elemento);
  return element;
}
const elemento = document.querySelector('#apaga-tudo');
elemento.addEventListener('click', () => { lista.innerHTML = ''; });// essa função adiciona evento de apagar todas as tarefas
function addEventClearFinished() { // essa função adiciona evento de apagar todas as tarefas concluídas
  const element = document.querySelector('#remover-finalizados');
  element.addEventListener('click', () => {
    const list = document.querySelectorAll('.completed');
    for (let index = 0; index < list.length; index += 1) {
      list[index].parentNode.removeChild(list[index]);
    }
  });
}

function addEventSaved() { // essa função adiciona evento que ao ser acionada, executa a função anterior salvando a lista;
  const elementoSaved = document.querySelector('#salvar-tarefas');
  elementoSaved.addEventListener('click', () => {
    localStorage.setItem('tasks', lista.innerHTML);
  });
}
function addElementsSaved() { // essa função ao ser executada, trás o html salvo para a pagina
  const tasks = localStorage.getItem('tasks');
  lista.innerHTML = tasks;
}
function addEventMoveUp() { // essa função adiciona evento de mover para cima;
  const movedUp = document.querySelector('#mover-cima');
  movedUp.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    const item = lista.firstElementChild;
    if (selected !== item && selected !== null) {
      lista.insertBefore(selected, selected.previousSibling);
    }
  });
}
function addEventMoveDown() { // essa função adiciona evento de mover para baixo;
  const movedDown = document.querySelector('#mover-baixo');
  movedDown.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    const item = lista.lastElementChild;
    if (selected !== item && selected !== null) {
      lista.insertBefore(selected, selected.nextElementSibling.nextSibling);
    }
  });
}
function taskSubmit() { // função que adiciona o elemento com o valor do input
  const taskValue = document.querySelector('#texto-tarefa').value;
  const newElement = criaElemento('li');
  newElement.innerText = taskValue;
  newElement.classList = 'list';
  lista.appendChild(newElement);
  document.querySelector('#texto-tarefa').value = '';
}
lista.addEventListener('click', (eventoDeOrigem) => {
  const list = document.querySelectorAll('.list');
  const evento = eventoDeOrigem.target;
  for (let index = 0; index < list.length; index += 1) {
    if (list[index] !== evento) {
      list[index].classList.remove('selected');
    } else {
      list[index].classList.add('selected');
    }
  }
});
lista.addEventListener('dblclick', (eventoDeOrigem) => {
  const list = document.querySelectorAll('.list');
  const evento = eventoDeOrigem.target;
  for (let index = 0; index < list.length; index += 1) {
    if (list[index] === evento) {
      list[index].classList.toggle('completed');
    }
  }
});
function addEventClearSelect() {
  const elementSelect = document.querySelector('#remover-selecionado');
  elementSelect.addEventListener('click', () => {
    const element = document.querySelector('.selected');
    if (element !== null) {
      element.remove();
    }
  });
}
const taskBtn = document.querySelector('#criar-tarefa');
taskBtn.addEventListener('click', taskSubmit); // evento que adiciona tarefa a lista;
const textTask = document.querySelector('#texto-tarefa');
textTask.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if (keyName === 'Enter') {
    taskSubmit()
  }
})


window.onload = () => {
  addElementsSaved();
  addEventClearFinished();
  addEventClearSelect();
  addEventSaved();
  addEventMoveUp();
  addEventMoveDown();
};
