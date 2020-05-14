//UI

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");

const btnDeleteAll = document.querySelector("#btnDeleteAll");
const tasklist = document.querySelector("#task-list");

let items;

loadItems();

eventlisteners();


function eventlisteners() {
  //submit
  form.addEventListener("submit", addNewItem);

  //delete
  tasklist.addEventListener("click", deleteItem);

  //delete all button
  btnDeleteAll.addEventListener("click", btnDeleteAllItems);
}

function loadItems(e) {
  items = getItemsFromLS();

  items.forEach(function (item) {
    createItem(item);
  });
}

//Get Items from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem('items')===null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

// set item to local storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
  }

      //delete item from LS
function deleteItemFromLS(text){ 
    items = getItemsFromLS();
    items.forEach(function(item,index) {
      if (item === text) {
      items.splice(index,1);
      }
      localStorage.setItem('items',JSON.stringify(items));
    })
  }

function createItem(text) {
  //create li
  const li = document.createElement("li");
  li.classList = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  //create a
  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  //add a to li
  li.appendChild(a);

  // add li to ul
  tasklist.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("Add New Task");
  } else {
    createItem(input.value);

    //save to Local Storage
    setItemToLS(input.value);

    //clear input
    input.value = "";
  }

  e.preventDefault();
}

//delete item
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();

    deleteItemFromLS(e.target.parentElement.parentElement.textContent);

  }

    
  e.preventDefault();
}

//delete all
function btnDeleteAllItems(e) {
  if (tasklist.innerHTML != "") {
    if (confirm("Are You Sure?")) {
      //Option 1.
      // tasklist.innerHTML = "";

      //Option 2.
      // tasklist.childNodes.forEach(function(item){
      //     if(item.nodeType===1){
      //         item.remove();
      //     }
      // })

      //Option 3
      while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
      }
    }
  }
  localStorage.clear();
  e.preventDefault();
}
