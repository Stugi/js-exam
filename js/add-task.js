'use strict';

document.getElementById("link-add-user").addEventListener("click", createUser);

getRules().map(rule=>{
  rule.elem.addEventListener(rule.action, rule.validate.bind(rule));
});

function validateAll(){
  return getRules().every(rule=>rule.validate(rule));
}

document.querySelector(".icon-div").addEventListener("click", closePopup);
function closePopup(){
  this.parentElement.classList.add("hide");
}
function showPopup(popupId){
  let popup = document.getElementById(popupId);
  popup.classList.remove("hide");
}

function hidePopup(popup){
    popup.classList.add("hide");
}



document.forms["form-add-task"].addEventListener("submit", submitForm);
function submitForm(event){
  event.preventDefault();
   if(validateAll()){
     saveTask(this.elements);
     showPopup("p_addtask");
  } else{
  }
}

function saveTask({title, description, date, emp}){
  let tasks = getArrayFromStorage("tasks");
  let users = [];
  if(!emp){
  }  else if(emp instanceof RadioNodeList){
    [...emp].forEach(select=>{
      [...select].forEach(option=>{if(option.selected) users.push(option.value);});
    });
  } else {
    [...emp].forEach(
      option=>{if(option.selected) users.push(option.value);}
    );
  }
  tasks.push({"title":title.value, "description":description.value, "date":date.value, "users":users, "id":generateId()});
  let storage = localStorage;
  storage.setItem("tasks", JSON.stringify(tasks));
}

function getArrayFromStorage(key){
  let storage = localStorage;
  let arr = JSON.parse(storage.getItem(key));
  return arr?arr:new Array();
}

function generateId(){
  let id = localStorage.getItem("idTask");
  id = id?(parseInt(id)+1):1;
  localStorage.setItem("idTask", id);
  return id;
}

document.forms["form-add-task"].addEventListener("reset", resetForm);
function resetForm(event){
  getRules().map(({errorField})=>{
                  errorField.style.color = "transparent";
                  errorField.innerText = "''";});
                  var elements = this.elements;
  document.getElementById("users").innerHTML = "";
  this.reset();
}

function createUser(){
  let userDiv = document.createElement("div");
  userDiv.setAttribute("name","panel-user");
  userDiv.innerHTML = `<select name="emp">${getOptions().join("")}</select>`;
                       // <span class="material-icons icon-remove">close</span>`;
  let deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-icons","icon-remove");
  deleteIcon.innerText="close";
  deleteIcon.addEventListener("click", removeUser);
  userDiv.append(deleteIcon);
  document.getElementById("users").append(userDiv);
}

function removeUser(event){
  event.target, event.target.parentElement.remove();
}

function getOptions(){
  let listOptions = [];
  getAllUserList().forEach(function (element) {
       listOptions.push("<option value="+element.id+">"+element.displayname+"</option>");
    });
  return listOptions;
}

function getAllUserList(){
  return [{displayname:"Иванов ИИ", id:"user22789"},{displayname:"Кузнецов АА", id:"user7889"},{displayname:"Сидоров ПО", id:"user23189"}]
}

function getRules(){
  let form = document.forms["form-add-task"];
  return[
 {name:"descriptionRules",
  elem:form.elements.description,
  errorField: document.getElementById("error-description"),
  validate(){return true;},
  action: "blur"
},
{ name:"titleRules",
  elem:form.elements.title,
  minLength: 1,
  maxLength: 20,
  errorField: document.getElementById("error-title"),
  validate(){   this.elem.value = this.elem.value.trim();
                if(this.elem.value.length<this.minLength){
                  this.errorField.style.color="red";
                  this.errorField.innerText = "Значение не может быть пустым";
                  return false;
                }
                if(this.elem.value.length>this.maxLength){
                  this.errorField.style.color="red";
                  this.errorField.innerText = `Максимальное количество символов ${this.maxLength} символов`;
                  return false;
                }
                this.errorField.style.color="transparent";
                this.errorField.innerText ="''";
                return true;},
  action: "blur"
},
{ name:"dateRules",
  elem:form.elements.date,
  errorField: document.getElementById("error-date"),
  validate(){
    if(!this.elem.value){
      this.errorField.style.color="red";
      this.errorField.innerText = "Значение не может быть пустым";
      return false;
    }
    let onlyDate = date=>new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if(onlyDate(new Date(this.elem.value))< onlyDate(new Date())){
      this.errorField.style.color="red";
      this.errorField.innerText = "Дата не может быть в прошлом";
      return false;
    }
    this.errorField.style.color="transparent";
    this.errorField.innerText ="''";
    return true;
  },
  action: "change"
}
];}
