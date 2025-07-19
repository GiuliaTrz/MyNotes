/*
    App Elements
*/
const btnAddNote = document.getElementById("btnAddNote");
const notesBox = document.getElementById("notesBox");
const btnExportAll = document.getElementById("btnExportAll");

/*
    Editor controls
*/
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
    alert("New note button clicked!");
}

function onbtnExportAllClicked(){
    alert("Export all button clicked!");
}

// - Editor buttons

function onbtnHomeClicked(){
    alert("Home!");
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