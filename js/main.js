/*
    App Elements
*/

const storage = new LocalStorageDB("MyNotes");
const btnAddNote = document.getElementById("btnAddNote");
const notesBox = document.getElementById("notesBox");
const btnExportAll = document.getElementById("btnExportAll");
const btnImportAll = document.getElementById("btnImportAll");
const appTitle = document.getElementById("appTitle");
const fileInput = document.getElementById('fileInput');
const btnThemeToggle = document.getElementById("btnThemeToggle");
const btnThemeToggle_Moon = document.getElementById("btnThemeToggle_Moon");
const btnThemeToggle_Sun = document.getElementById("btnThemeToggle_Sun");

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


var currentNoteKey = null;
var currentNoteObj = null;
var currentTheme = "dark";

refreshNotes();

function refreshNotes(){
    const notesBox = document.getElementById("notesBox");
    notesBox.innerHTML = "";

    const allNotes = storage.getAll();
    Object.keys(allNotes).forEach(key => {
      addNoteToList(key, allNotes[key]);
    });
}

function switchTheme(){
    if(currentTheme == "dark"){
        // Sets the light theme
        btnThemeToggle_Moon.classList.remove("d-none");
        btnThemeToggle_Sun.classList.add("d-none");
        currentTheme = "light";
    }
    else if(currentTheme == "light"){
        // Sets the dark theme
        btnThemeToggle_Moon.classList.add("d-none");
        btnThemeToggle_Sun.classList.remove("d-none");
        currentTheme = "dark";
    }
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
    currentNoteObj = note;
    currentNoteKey = key;
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
    btnImportAll.classList.add("d-none"); // hides the import all button
    appTitle.classList.add("d-none"); // hides the app title
}

function hideEditor(){
    editorBox.classList.add("d-none"); //Hide the editor
    notesBox.classList.remove("d-none") // Show the notes list
    btnExportAll.classList.remove("d-none"); //shows the export all button
    btnAddNote.classList.remove("d-none"); //shows the "add note" button
    btnImportAll.classList.remove("d-none"); // shows the import all button
    appTitle.classList.remove("d-none"); // shows the app title
}

function onbtnExportAllClicked(){
    var fileName = "MyNotes_" + formatDate(new Date()).replace("-","_") + ".json";
    download(fileName, storage.serialize());
}

// - Editor buttons
function onbtnHomeClicked(){
    currentNoteKey = null; // Resets the courrent note 
    currentNoteObj = null; // Resets the courrent note
    hideEditor();
}

function onbtnNewNoteClicked(){
    var note = new Note(txtNoteTitle.value, txtNoteBody.value);

    if(currentNoteKey != null){ // update existing note
        storage.save(currentNoteKey, note);
    }else { // new note
        let uuid = self.crypto.randomUUID();
        storage.save(uuid, note);
    }

    refreshNotes();
}

function onbtnDeleteClicked(){
    if(currentNoteKey != null){
        if(storage.delete(currentNoteKey)){
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

/**
 * loadNotes loads the content of the notes (the content of the file .json)
 * @param {*} file 
 */
function loadNotes(file){
    const fileContent = file.target.result; // JSON content (String)
    var db = JSON.parse(fileContent); // Parses the full database dump
    var notes = Object.values(db.data); // Converts the JSON Object to an array of notes (removing the ID)

   notes.forEach(addNoteToDb); // Load the notes
   refreshNotes(); // Refresh the notes list
   alert("Loaded " + notes.length + " Notes!");
}

/**
 * This method is used only in the loadNotes forEach
 * to load a single note into the database
 * 
 * The UUID is generated randomly, the note timestamp is selected
 * from the source note
 * @param {Note} note 
 */
function addNoteToDb(note){
    var note = new Note(note.title, note.body, note.timestamp);
    let uuid = self.crypto.randomUUID();
    storage.save(uuid, note);
}

function onbtnImportAllClicked(){
    
      const file = fileInput.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        // Function that loads the notes when the file is selected 
        reader.onload = loadNotes;
        
        // Reads the file as text
        reader.readAsText(file);
    } 

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
btnThemeToggle.onclick = switchTheme;

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
     * @param {string} body the note body
     * @param {string} [data] the note creation date (optional)
     */
    constructor(title, body, data = null) {
        this.title = title;
        this.body = body;
        this.timestamp = data ? data : formatDate(new Date());
    }
}