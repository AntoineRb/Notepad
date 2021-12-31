let userNotes    = new Map();
let nbOfNotes    = 0;
let actualNoteId = 0;

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
  const id        = ++nbOfNotes;
  actualNoteId    = id;

  userNotes.set( id ,{
    noteTitle: title,
    userNote: note,
    creationDate: localDate
  })
}

function showModal( yStart, yEnd, durationTime = 650 ) {
    dialogTitle.animate([
        // keyframes
        { transform: `translateY(${yStart})` },
        { transform: `translateY(${yEnd})` }
      ], {
        // timing options
        duration: durationTime
        
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

  const titleToRemove = userNotes.get( actualNoteId )['noteTitle'];
  const userAnswer = confirm(`Are you sure to delete this note ?\n'${titleToRemove}'`);

  if ( userAnswer ) {

    nbOfNotes--;
    userNotes.delete(id);
    noteList.querySelector(`#note${id}`).remove();
    title.textContent = 'MemoryPad';
    userNoteInput.style.display = 'none';
    console.log(typeof( actualNoteId ));
    
  }
}

function openNote( id ) {
  actualNoteId        = id;
  title.textContent   = userNotes.get(actualNoteId)['noteTitle'];
  console.log( title.textContent );
  userNoteInput.value = userNotes.get(actualNoteId)['userNote'];
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

    console.log( 'Log event Dialog, Actual ID : ' + actualNoteId);
    const targetElement = document.querySelector(`#note${actualNoteId}`);
    const titleToChange = targetElement.querySelector('.list-title');

    userNotes.set( actualNoteId, {
      noteTitle: titleInput,
      userNote:  userNoteInput.value
    });

    title.textContent         = titleInput;
    titleToChange.textContent = titleInput;

    dialogForm.querySelector('input').value = '';
    showModal('0px', '-600px');

    console.log( 'After Log event Dialog, Actual ID : ' + actualNoteId);
    console.log(userNotes.get(actualNoteId)['noteTitle']);

    e.preventDefault();
  }


  if ( dialogId == 'set-title' && titleInput.length > 0) {
    title.textContent = titleInput;

    setNewNote( titleInput );
    addElementToList( actualNoteId , titleInput, getLocalDate() );
    showModal('0px', '-600px');

    dialogForm.querySelector('input').value = '';
    userNoteInput.value = '';
    userNoteInput.style.display = '';
  } 
});

dialogTitle.querySelector('.btn-cancel').addEventListener('click', () => {
  showModal('0px', '-600px');
});

noteList.addEventListener( 'click', (e) => {

  if ( e.target.nodeName == 'LI' ) {

    openNote( Number( e.target.id.replace('note', '') ) );
    userNoteInput.style.display = '';

  } else if ( e.target.parentElement.nodeName == 'LI' ) {

    openNote( Number( e.target.parentElement.id.replace('note', '') ) );
    userNoteInput.style.display = '';
  }
  console.log( 'Log event note list Actual ID : ' + actualNoteId);
});

userNoteInput.addEventListener('keyup', (e) => {
  
  userNotes.set( actualNoteId, {
    noteTitle: title.textContent,
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

  if ( !(nbOfNotes == 0) ) {
    dialogForm.querySelector('label').textContent = 'Set a new title :';
    dialogTitle.id = 'update-title';
    showModal('-600px', '0px');
  }
});

btnDelete.addEventListener( 'click', () => {
  removeNote( actualNoteId );
});
