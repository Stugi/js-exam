'use strict';



let main = document.querySelector("main");
main.append(getHeader(),generateList());

function generateList(){
  let sectionAllTask = document.createElement("section");
  sectionAllTask.classList.add("task-list");
  if(!getDataTasks()){
    sectionAllTask.innerHTML = "<div><p>Задачи не найдены</p></div>";
  }
  console.log(getDataTasks());
  for(let task of getDataTasks()){
    let taskDiv = document.createElement("div");

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
