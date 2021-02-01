console.log("connted");
showNotes();

//if user adds notes added to local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //i stringify this because in localstorage store in string formate
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);

  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` <div class="noteCard my-2 mx-2 card" style="width: 18rem;">  
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete Now</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else{
      notesElm.innerHTML = `you notes will appear here`;
  }
}

//function to delete notes
function deleteNote(index){
    console.log('deleting',index);

    let notes = localStorage.getItem("notes");
    if(notes ==null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    console.log('input event fired',inputVal); 
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
       // console.log(cardTxt);
       if(cardTxt.includes(inputVal)){
           element.style.display = "block";
       }else{
           element.style.display = "none";
       }
    })
})