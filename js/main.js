/*
    App Elements
*/

const storage = new LocalStorageDB("MyNotes");
const btnAddNote = document.getElementById("btnAddNote");
const notesBox = document.getElementById("notesBox");
const btnExportAll = document.getElementById("btnExportAll");

/*
    Editor controls
*/
const editorBox = document.getElementById("editorBox");
const btnHome = document.getElementById("btnHome");
const btnNewNote = document.getElementById("btnNewNote");
const btnDelete  = document.getElementById("btnDelete");
const btnExport  = document.getElementById("btnExport");
const txtNoteTitle = document.getElementById("txtNoteTitle");
const txtnoteDate  = document.getElementById("txtnoteDate");

const allNotes = storage.getAll();

Object.keys(allNotes).forEach(key => {
  addNoteToList(key, allNotes[key]);
});

/**
 * Method called for each note in the database.
 * 
 * Adds the note to the notesBox div
 * @param {*} key The note UUID
 * @param {*} note The Note Object
 */
function addNoteToList(key, note) {
  const noteDiv = document.createElement("div");
  noteDiv.setAttribute("id",key);
  noteDiv.setAttribute("class","d-flex justify-content-between py-2 note-item");

  const noteTitle = document.createElement("span");
  const noteDate = document.createElement("span");

  noteTitle.setAttribute("class","spnNoteTitle");
  noteDate.setAttribute("class","spnNoteDate");
  
  noteTitle.innerText = note.title;
  noteDate.innerText = note.timestamp;

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteDate);

  const notesBox = document.getElementById("notesBox");
  notesBox.appendChild(noteDiv);
}

// Converts the date object to a specific date format 
function formatDate(date){
    return date.toLocaleDateString();
}

/*
    BUTTON EVENTS
*/
function onbtnAddNoteClicked(){
    editorBox.classList.remove("d-none"); // Show the editor
    notesBox.classList.add("d-none"); // Hide the notes list
    btnExportAll.classList.add("d-none"); //hides the export all button
    btnAddNote.classList.add("d-none"); //hides the "add note" button
}

function onbtnExportAllClicked(){
    alert("Export all button clicked!");
}

// - Editor buttons
function onbtnHomeClicked(){
    editorBox.classList.add("d-none"); //Hide the editor
    notesBox.classList.remove("d-none") // Show the notes list
    btnExportAll.classList.remove("d-none"); //shows the export all button
    btnAddNote.classList.remove("d-none"); //shows the "add note" button
}

function onbtnNewNoteClicked(){
    var note = new Note(txtNoteTitle.value, txtnoteDate.value);
    let uuid = self.crypto.randomUUID();
    storage.save(uuid, note);
}

function onbtnDeleteClicked(){
    alert("Note deleted!");
}

function onbtnExportClicked(){
    console.info("Note title: " + txtNoteTitle.value);
    console.info("Note body: " + txtnoteDate.value);
}

// Attach events
btnAddNote.onclick = onbtnAddNoteClicked;
btnExportAll.onclick = onbtnExportAllClicked;

// - Editor buttons
btnNewNote.onclick = onbtnNewNoteClicked;
btnDelete.onclick =  onbtnDeleteClicked;
btnExport.onclick = onbtnExportClicked;
btnHome.onclick = onbtnHomeClicked;

/*
Note class (model)
*/
class Note {
    /**
     * Creates a new Note instance.
     * 
     * @param {string} title the note title
     * @param {string} body  the note body
     */
    constructor(title, body){
        this.title = title;
        this.body = body;
        this.timestamp = formatDate(new Date());
    }
}