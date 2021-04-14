// Sellectors
const notesInput = document.getElementById("notesInput");
const submit = document.getElementById("submit");
const notesContainer = document.getElementById("notesContainer");
const addNotes = document.getElementById("addNotes");

// Functions

// Adding notes
const adding = () => {
  const notesDiv = document.createElement("div");
  notesDiv.classList.add("notes__leftNote");
  const notesElem = document.createElement("p");
  notesElem.innerText = notesInput.value;
  notesDiv.appendChild(notesElem);
  saveNotes(notesInput.value);
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("notes__icon");
  deleteBtn.innerHTML =
    '<img src="img/delete.png" alt="delete" class="delete__btn">';
  notesDiv.appendChild(deleteBtn);

  // Appending to the main div (notesContainer)
  if (notesInput.value) {
    notesContainer.appendChild(notesDiv);
    notesInput.value = "";
    notesInput.disabled = true;
    notesInput.style.border = "none";
    submit.disabled=true
  } else {
    alert("Please Write Something To Add In Notes");
  }
};

// Deleting Notes
const deleting = (e) => {
  const item = e.target;
  if (item.classList[0] === "notes__icon") {
    item.parentElement.remove();
    deleteNote(item.parentElement)
  }
};

// Save into LocalStorage
const saveNotes = (noteval) => {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.push(noteval);
  if(noteval){
  localStorage.setItem("notes", JSON.stringify(notes));
  }
};

// Get Notes from Localstorage
const getNotes = () => {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.forEach((note) => {
    const notesDiv = document.createElement("div");
    notesDiv.classList.add("notes__leftNote");
    const notesElem = document.createElement("p");
    notesElem.innerText = note;
    notesDiv.appendChild(notesElem);
    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("notes__icon");
    deleteBtn.innerHTML =
      '<img src="img/delete.png" alt="delete" class="delete__btn">';
    notesDiv.appendChild(deleteBtn);
    notesContainer.appendChild(notesDiv);
  });
};
// Delete Notes from LocalStorage
const deleteNote =(noteval)=>{
    let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  const noteIndex=(noteval.children[0].innerText)
  notes.splice(notes.indexOf(noteIndex),1)
  localStorage.setItem('notes',JSON.stringify(notes))
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getNotes)
submit.addEventListener("click", adding);
addNotes.addEventListener("click", () => {
  notesInput.disabled = false;
  notesInput.style.border = "2px solid #3AD4CB";
  submit.disabled=false
});
notesContainer.addEventListener("click", deleting);
