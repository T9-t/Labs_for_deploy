const tasks = {
  task1: "",
  task2: "",
  task3: "",
};

const quizSection = document.getElementById('quiz');
const taskInput1 = document.getElementById('task1');
const taskInput2 = document.getElementById('task2');
const taskInput3 = document.getElementById('task3');
const startBtn = document.getElementById('startMeme');

const content = document.querySelector('.content');
const result = document.querySelector('.full-screen-bg');

startBtn.addEventListener('click', () => {
  tasks.task1 = taskInput1.value || taskInput1.placeholder;
  tasks.task2 = taskInput2.value || taskInput2.placeholder;
  tasks.task3 = taskInput3.value || taskInput3.placeholder;

  for (const task in tasks){
    const column = document.createElement('div'); 
    const print = document.createElement('p');
    print.textContent = tasks[task];

    column.appendChild(print);
    content.appendChild(column);
  }
  quizSection.classList.add('hidden');
  result.removeAttribute('hidden');
});