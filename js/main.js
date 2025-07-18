/*
    App Elements
*/
const btnAddNote = document.getElementById("btnAddNote");
const notesBox = document.getElementById("notesBox");
const btnExportAll = document.getElementById("btnExportAll");

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



// Attach events
btnAddNote.onclick = onbtnAddNoteClicked;
btnExportAll.onclick = onbtnExportAllClicked;

