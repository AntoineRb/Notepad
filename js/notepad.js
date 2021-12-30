let userNotes  = new Map();
let nbOfNotes    = 0;
let actualNoteid = 0;

const notePadContainer = document.querySelector( '.notepad-container' );

// Aside
const noteListSection  = notePadContainer.querySelector( '.note-list-block' );
const noteList         = noteListSection.querySelector( '.note-list' );
const listTopBar       = noteListSection.querySelector( '.list-top-bar' );

const btnAdd    = listTopBar.querySelector( '.btn-add'  );
const btnEdit   = listTopBar.querySelector( '.btn-edit' );
const btnDelete = listTopBar.querySelector( '.btn-delete' );

// Article
const noteContainer = notePadContainer.querySelector( '.note-container' );
const title         = noteContainer.querySelector('header').querySelector('h1');
const userNoteInput = noteContainer.querySelector('.user-note-input');

const dialogTitle   = noteContainer.querySelector('.modal-choose-title');
const dialogForm    = dialogTitle.querySelector('form');

// Change the visibility of the textarea
userNoteInput.style.display = 'none';


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
  nbOfNotes++;
  const id        = nbOfNotes;
  actualNoteid    = nbOfNotes;

  console.log(id);

  userNotes.set( id ,{
    noteTitle: title,
    userNote: note,
    creationDate: localDate
  })

  // console.log(userNotes.get(id));
  
}

function showModal( yStart, yEnd, durationTime = 600 ) {
    dialogTitle.animate([
        // keyframes
        { transform: `translateY(${yStart})` },
        { transform: `translateY(${yEnd})` }
      ], {
        // timing options
        duration: durationTime,
        // iterations: 1
        
      });
      dialogTitle.style.top = yEnd;
}

function addElementToList( noteId, noteTitle, noteDate ) {
  const newElement = document.createElement('li');
  const heading    = document.createElement('h2');
  const caption    = document.createElement('p');
  
  newElement.id = `note${noteId}`;

  heading.className   = "list-title";
  heading.textContent = noteTitle;

  caption.className   = "caption";
  caption.textContent = noteDate; 

  newElement.append( heading, caption );
  noteList.prepend( newElement );
}

function removeNote( id ) {
  //Next Feature
}

function openNote( id ) {
  actualNoteid        = id;
  title.textContent   = userNotes.get(actualNoteid)['noteTitle'];
  userNoteInput.value = userNotes.get(actualNoteid)['userNote'];
}

//btn Add event
btnAdd.addEventListener('click', (e) => {

  dialogForm.querySelector('label').textContent = 'Set a title :';
  dialogTitle.id = 'set-title'; // To know if the event set a title or event update a title

  showModal('-600px', '0px');     
});

// add instructions to save values
dialogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput  = dialogForm.querySelector('input').value;
  let dialogId      = dialogTitle.id;

  if ( dialogId == 'update-title' &&  titleInput.length > 0) { // Update title

    console.log( 'Log event Dialog, Actual ID : ' + actualNoteid);
    const targetElement = document.querySelector(`#note${actualNoteid}`);
    const titleToChange = targetElement.querySelector('.list-title');

    userNotes.set( actualNoteid, {
      noteTitle: titleInput
    });

    title.textContent   = titleInput;
    titleToChange.textContent = titleInput;

    dialogForm.querySelector('input').value = '';
    showModal('0px', '-600px');

    console.log( 'After Log event Dialog, Actual ID : ' + actualNoteid);
    console.log(userNotes.get(actualNoteid)['noteTitle']);
  }


  if ( dialogId == 'set-title' && titleInput.length > 0) {
    title.textContent = titleInput;

    setNewNote( titleInput );
    addElementToList( actualNoteid , titleInput, getLocalDate() );
    showModal('0px', '-600px');

    dialogForm.querySelector('input').value = '';

    userNoteInput.style.display = '';
  } 
});

dialogTitle.querySelector('.btn-abort').addEventListener('click', () => {
  showModal('0px', '-600px');
});

noteList.addEventListener( 'click', (e) => {

  if ( e.target.nodeName == 'LI' ) {

    openNote( Number( e.target.id.replace('note', '') ) );

  } else if ( e.target.parentElement.nodeName == 'LI' ) {

    openNote( Number( e.target.parentElement.id.replace('note', '') ) );
  }
  console.log( 'Log event note list Actual ID : ' + actualNoteid);
});

userNoteInput.addEventListener('keyup', (e) => {
  
  userNotes.set( actualNoteid, {
    userNote: userNoteInput.value
  })

});

userNoteInput.addEventListener('keydown', (e) => {
  let code = e.keyCode || e.which;
  
  if ( code === 9 ) { // Tab keypress event
    e.preventDefault()
    userNoteInput.value += '   ';
  }
});

btnEdit.addEventListener( 'click', () => {

  if ( !(actualNoteid == 0) ) {
    dialogForm.querySelector('label').textContent = 'Set a new title :';
    dialogTitle.id = 'update-title';
    showModal('-600px', '0px');
  }
});

