const noteCreateBtn = document.querySelector("#create-note");
const noteContainerEl = document.querySelector(".note-container");

function loadUI() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((noteText) => createNoteElement(noteText));
}

function updateUI() {
  const notes = Array.from(
    noteContainerEl.querySelectorAll(".note-input-field")
  ).map((note) => note.textContent);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(text = "hi") {
  const note = document.createElement("p");
  note.setAttribute("contenteditable", "true");
  note.classList.add("note-input-field");
  note.textContent = text;

  const delImg = document.createElement("IMG");
  delImg.src = "image/delete.png";
  delImg.alt = "Delete Note";
  delImg.classList.add("delete-icon");

  // Append delete icon and add the new note to the container
  note.appendChild(delImg);
  noteContainerEl.appendChild(note);
}

noteCreateBtn.addEventListener("click", () => {
  createNoteElement();
  updateUI();
});

noteContainerEl.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateUI();
  }
});

noteContainerEl.addEventListener("input", (e) => {
  if (e.target.classList.contains("note-input-field")) {
    updateUI();
  }
});

// Load existing notes on page load
loadUI();
