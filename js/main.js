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
const txtNoteBody  = document.getElementById("txtNoteBody");

var courrentNoteKey = null;
var courrentNoteObj = null;

refreshNotes();

function refreshNotes(){
    const notesBox = document.getElementById("notesBox");
    notesBox.innerHTML = "";

    const allNotes = storage.getAll();
    Object.keys(allNotes).forEach(key => {
      addNoteToList(key, allNotes[key]);
    });
}

/**
 * Method called for each note in the database.
 * 
 * Adds the note to the notesBox div
 * @param {*} key The note UUID
 * @param {*} note The Note Object
 */
function addNoteToList(key, note) {
  const notesBox = document.getElementById("notesBox");

  const noteDiv = document.createElement("div");
  noteDiv.setAttribute("id",key);
  noteDiv.setAttribute("class","d-flex justify-content-between py-2 note-item");

  const noteTitle = document.createElement("span");
  const noteDate = document.createElement("span");

  noteTitle.setAttribute("class","spnNoteTitle");
  noteDate.setAttribute("class","spnNoteDate");
  
  noteTitle.innerText = note.title;
  noteDate.innerText = note.timestamp;

  noteTitle.onclick = function(){ onNoteClick(key,note)};

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteDate);

  notesBox.appendChild(noteDiv);
}

/**
 * Gets note data and opens the editor
 * @param {*} key 
 * @param {*} note 
 */
function onNoteClick(key, note){ 
    courrentNoteObj = note;
    courrentNoteKey = key;
    txtNoteTitle.value = note.title;
    txtNoteBody.value = note.body;
    showEditor();
}

// Converts the date object to a specific date format 
function formatDate(date){
    return date.toLocaleDateString();
}

/*
    BUTTON EVENTS
*/
function onbtnAddNoteClicked(){
    txtNoteTitle.value = "";
    txtNoteBody.value = "";
    showEditor();
}

function showEditor(){
    editorBox.classList.remove("d-none"); // Show the editor
    notesBox.classList.add("d-none"); // Hide the notes list
    btnExportAll.classList.add("d-none"); //hides the export all button
    btnAddNote.classList.add("d-none"); //hides the "add note" button
}

function hideEditor(){
    editorBox.classList.add("d-none"); //Hide the editor
    notesBox.classList.remove("d-none") // Show the notes list
    btnExportAll.classList.remove("d-none"); //shows the export all button
    btnAddNote.classList.remove("d-none"); //shows the "add note" button
}

function onbtnExportAllClicked(){
    var fileName = "MyNotes_" + formatDate(new Date()).replace("-","_") + ".json";
    download(fileName, storage.serialize());
}

// - Editor buttons
function onbtnHomeClicked(){
    hideEditor();
}

function onbtnNewNoteClicked(){
    var note = new Note(txtNoteTitle.value, txtNoteBody.value);

    if(courrentNoteKey != null){ // update existing note
        storage.save(courrentNoteKey, note);
    }else { // new note
        let uuid = self.crypto.randomUUID();
        storage.save(uuid, note);
    }

    refreshNotes();
}

function onbtnDeleteClicked(){
    if(courrentNoteKey != null){
        if(storage.delete(courrentNoteKey)){
            refreshNotes();
            alert("Note deleted!");
            hideEditor();
        }
    }
}

function onbtnExportClicked(){
    var fileName = txtNoteTitle.value + ".txt";
    var noteBody = txtNoteBody.value;    
    download(fileName, noteBody);
}

// This function allow the user to create a file in memory and download it
function download(filename, text) {
    var element = document.createElement('a');

    // Generates the download link
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
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