let userNotes  = new Map();
let actualNoteid = userNotes.size;

const notePadContainer = document.querySelector( '.notepad-container' );

// Aside
const noteListSection  = notePadContainer.querySelector( '.note-list-block' );
const noteList         = noteListSection.querySelector( '.note-list' );
const listTopBar       = noteListSection.querySelector( '.list-top-bar' );

const btnAdd    = listTopBar.querySelector( '.btn-add'  );
const btnEdit   = listTopBar.querySelector( '.btn-edit' );
const btnDelete = listTopBar.querySelector( '.btn-delete' );
const btnSave   = listTopBar.querySelector( '.btn-save' );

// Article
const noteContainer = notePadContainer.querySelector( '.note-container' );
const title         = noteContainer.querySelector('header').querySelector('h1');
const textArea      = noteContainer.querySelector('.user-note-input');

const dialogTitle   = noteContainer.querySelector('.modal-choose-title');
const dialogForm    = dialogTitle.querySelector('form');

// Change the visibility of the textarea
// textArea.style.display = 'none';


function getLocalDate() {
  let actualDate = new Date();
  let localDate  = actualDate.toLocaleString( navigator.language, {

    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
    hour:    'numeric',
    minute:  'numeric',
    second:  'numeric' 
  });

  return localDate;
}

function setNewNote( title, note = '') {
  const localDate = getLocalDate();
  const id        = userNotes.size;
  actualNoteid    = id;

  console.log(id);

  userNotes.set( id ,{
    noteTitle: title,
    userNote: note,
    creationDate: localDate
  })
}


function showModal( yStart, yEnd, durationTime = 600 ) {
    dialogTitle.animate([
        // keyframes
        { transform: `translateY(${yStart})` },
        { transform: `translateY(${yEnd})` }
      ], {
        // timing options
        duration: durationTime,
        iterations: 1
        
      });
      dialogTitle.style.top = yEnd;
}

//btn Add event
btnAdd.addEventListener('click', (e) => {
  showModal('-600px', '0px');     
});

function addElementToList( noteId, noteTitle, noteDate ) {
  const newElement = document.createElement('li');
  const heading    = document.createElement('h2');
  const caption    = document.createElement('p');
  
  newElement.id = noteId;

  heading.className   = "list-title";
  heading.textContent = noteTitle;

  caption.className   = "caption";
  caption.textContent = noteDate; 

  newElement.appendChild( heading, caption );
  noteList.appendChild( newElement );
}


// add instructions to save values
dialogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = dialogForm.querySelector('input').value;
  title.textContent = titleInput;
  setNewNote( titleInput );
  let a = userNotes.get(0)['creationDate'];
  console.log(a);
  
  showModal('0px', '-600px');
});
dialogTitle.querySelector('.btn-abort').addEventListener('click', () => {

  showModal('0px', '-600px');
});

