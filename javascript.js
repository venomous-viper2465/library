'use-strict'

const myLibrary = [];

function assignValues(obj){
  let arr = [];
    for(let i=0; i<3; ++i){
      arr.push(document.createElement('p'));
    }
  arr[0].textContent = `${obj.title}`;
  arr[1].textContent = `${obj.author}`;
  arr[2].textContent = `${obj.pages}`;
  return arr
}

function buttonStatus(notRead, readStatus){
    if(readStatus === "Not Read") notRead.classList.add('checked');
    else notRead.classList.add('unchecked'); 
    notRead.textContent = `${readStatus}`;
    return notRead;
}

function removeEvent(remove){
  remove.addEventListener('click', ()=>{
    let value = remove.getAttribute('index');
    let box = document.querySelector(`div[index="${value}"]`);
    value = Number(value);
    myLibrary.splice(value, 1);
    box.remove();
  });
}

function notReadEvent(notRead){
  notRead.addEventListener('click', ()=>{
    if(notRead.classList.contains('checked')){
      notRead.classList.remove('checked');
      notRead.classList.add('unchecked');
      notRead.textContent=`Read`;
    }
    else{
      notRead.classList.remove('unchecked');
      notRead.classList.add('checked');
      notRead.textContent=`Not Read`;
    }
  });
}

function createCard(obj, readStatus){
    let container = document.querySelector('.card-container');
    let parent = document.createElement('div');
    parent.setAttribute('index', `${myLibrary.length - 1}`);
    parent.classList.add('card-style');
    
    let arr = assignValues(obj);
  
    let notRead = document.createElement('button');
    notRead = buttonStatus(notRead, readStatus);

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.textContent = "Remove";
    remove.setAttribute('index', `${myLibrary.length - 1}`)

    removeEvent(remove);
    notReadEvent(notRead);

    for(let i = 0; i<3; ++i){
      parent.appendChild(arr[i]);
    }
    
    parent.appendChild(notRead);
    parent.appendChild(remove);
    container.appendChild(parent);
}



function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(obj) {
  // do stuff here
  myLibrary.push(obj);
}

const dialog = document.querySelector('dialog');
const addBook = document.querySelector('.content > button');
const dialogClose = document.querySelector('.title button');

dialogClose.addEventListener('click', ()=>{
  dialog.close();
});

addBook.addEventListener('click', ()=>{
  dialog.showModal();
});

const form = document.querySelector('form');
form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const  author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const checkBox = document.querySelector('#read');

  let readStatus;
  if(checkBox.checked) readStatus = "Not Read";
  else readStatus = "Read"; 

  let obj = new Book(title, author, pages);
  addBookToLibrary(obj);

  form.reset();
  dialog.close();
  createCard(obj, readStatus);
});
