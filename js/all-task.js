'use strict';

let taskstest =[
  { title:"red",
    description:"green",
    date: new Date()
  },
  { title:"red",
    description:"green",
    date: new Date()
  },
  { title:"red",
    description:"green",
    date: new Date()
  }
];
let storage = localStorage;
storage.setItem("tasks", JSON.stringify(taskstest));

let main = document.querySelector("main");
main.append(getHeader(),generateList());

function generateList(){
  let sectionAllTask = document.createElement("section");
  for(let task of getDataTasks()){
    let taskDiv = document.createElement("div");
    addOneTask(taskDiv,task);
    sectionAllTask.append(taskDiv);
  }
  return sectionAllTask;
}
function addOneTask(where, task){
  where.innerHTML = `
          <h2>${task.title}</h2>
          <p>${task.description}</p>
          <p>Выполнить к: ${task.date}</p>
  `;
}

function getHeader(){
  let header = document.createElement("h2");
  header.innerText = "Все задачи";
  return header;
}

function getDataTasks(){
  return getArrayFromStorage("tasks")?getArrayFromStorage("tasks"):"[]";
}
function getArrayFromStorage(key){
  let storage = localStorage;
  return JSON.parse(storage.getItem(key));
}
