/*
    App Elements
*/
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
const txtNoteBody  = document.getElementById("txtNoteBody");

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
}

function onbtnExportAllClicked(){
    alert("Export all button clicked!");
}

// - Editor buttons
function onbtnHomeClicked(){
    editorBox.classList.add("d-none"); //Hide the editor
    notesBox.classList.remove("d-none") // Show the notes list
}

function onbtnNewNoteClicked(){
    alert("New note!");
}

function onbtnDeleteClicked(){
    alert("Note deleted!");
}

function onbtnExportClicked(){
    console.info("Note title: " + txtNoteTitle.value);
    console.info("Note body: " + txtNoteBody.value);
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