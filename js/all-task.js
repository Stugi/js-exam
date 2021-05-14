'use strict';

let main = document.querySelector("main");
main.append(getHeader(), generateList());

document.getElementById("remove-tasks").addEventListener("click",removeSelectedTasks);

function generateList(){
  let sectionAllTask = document.createElement("section");
  sectionAllTask.classList.add("task-list");

  let dataTasks = getDataTasks();

  if(!dataTasks || dataTasks.length==0){
    sectionAllTask.innerHTML = "<p>Задачи не найдены</p>";
  } else {
    dataTasks.sort(sortTask);
  }
  for(let task of dataTasks){
    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("data-id",task.id);
    taskDiv.addEventListener("click",selectItem);

    if(task.users instanceof Array)
    {   task.allusersList = [];
        task.users.map(user=>{
          task.allusersList.push((getAllUserList().filter(u=>
            u.id==user))[0].displayname);
          });
    }
    addOneTask(taskDiv,task);
    sectionAllTask.append(taskDiv);
  }
  return sectionAllTask;
}

function addOneTask(where, task){
  where.innerHTML = `
          <h2>${task.title}</h2>
          <p>${task.description}</p>
          <p>Выполнить к: ${getDateString(task.date)}</p>
          ${task.allusersList.length==0 ? '': ('<p>Участники:'+ task.allusersList.join(" | ")+'</p>')}
  `;
}

function selectItem(event){
  this.classList.toggle("selected");
  refreshFooter();
}

function removeSelectedTasks(){

  let rowkeys = [];

  Array.from(document.querySelectorAll(".selected")).forEach(
     el=>{rowkeys.push(parseInt(el.dataset.id));}
   );

  let newtask = getDataTasks().filter(el=>!rowkeys.includes(el.id));
  localStorage.setItem("tasks", JSON.stringify(newtask));

  executeTasks();
  refreshFooter();
}

function executeTasks(){
  document.querySelector(".task-list").remove();
  document.querySelector("main").append(generateList());
}

function refreshFooter(){
    let status = document.getElementById("status");
    let count = document.querySelectorAll(".selected").length;
    status.innerText = "Выбрано задач: "+count;
    if(count>0){
      document.querySelector("footer").classList.remove("hide");
    } else {
      document.querySelector("footer").classList.add("hide");
    }
}

function getHeader(){
  let header = document.createElement("h2");
  header.innerText = "Все задачи";
  return header;
}

function getDataTasks(){
   return getArrayFromStorage("tasks")?getArrayFromStorage("tasks"):"";
}

function getArrayFromStorage(key){
  let storage = localStorage;
  return JSON.parse(storage.getItem(key));
}

function getAllUserList(){
  return [{displayname:"Иванов ИИ", id:"user22789"},{displayname:"Кузнецов АА", id:"user7889"},{displayname:"Сидоров ПО", id:"user23189"}]
}

function getDateString(date){
  let d = new Date(date);
  return (d.getDate()+"").padStart(2,'0')+"."+((d.getMonth()+1)+"").padStart(2,'0')+"."+d.getFullYear();
}

function sortTask({date:d1},{date:d2}){
let date1 = new Date(d1);
let date2 = new Date(d2);
 return date1.getTime()-date2.getTime();
}

// let taskstest =[
//   { title:"red",
//     description:"green",
//     date: new Date()
//   },
//   { title:"red",
//     description:"green",
//     date: new Date()
//   },
//   { title:"red",
//     description:"green",
//     date: new Date()
//   }
// ];
//
// let storage = localStorage;
// storage.setItem("tasks", JSON.stringify(taskstest));
