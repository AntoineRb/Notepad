import * as elem from './notepad-elements.js';

export let userNotes    = new Map();

export let nbOfNotes    = 0;
export let actualNoteId = 0;

export function getLocalDate() {
    
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
  
export function setNewNote( title, note = '') {

    const localDate = getLocalDate();
    const id        = ++nbOfNotes;
    actualNoteId    = id;

    userNotes.set( id ,{
        noteTitle: title,
        userNote: note,
        creationDate: localDate
    })
}

export function showModal( yStart, yEnd, durationTime = 650 ) {

    elem.dialogTitle.animate([
        // keyframes
        { transform: `translateY(${yStart})` },
        { transform: `translateY(${yEnd})` }
    ], {
        // timing options
        duration: durationTime
        
    });
    elem.dialogTitle.style.top = yEnd;
}

export function addElementToList( noteTitle, noteDate, noteId = actualNoteId ) {

    const newElement = document.createElement('li');
    const heading    = document.createElement('h2');
    const caption    = document.createElement('p');

    newElement.id    = `note${noteId}`;

    heading.className   = "list-title";
    heading.textContent = noteTitle;

    caption.className   = "caption";
    caption.textContent = noteDate; 

    newElement.append( heading, caption );
    elem.noteList.prepend( newElement );

    changeListElementColor();
}

export function removeNote( id ) {

    const titleToRemove = userNotes.get( actualNoteId )['noteTitle'];
    const userAnswer = confirm(`Are you sure to delete this note ?\n'${titleToRemove}'`);

    if ( userAnswer ) {

        nbOfNotes--;
        userNotes.delete(id);
        elem.noteList.querySelector(`#note${id}`).remove();
        elem.title.textContent = 'MemoryPad';
        elem.userNoteInput.style.display = 'none';
        
    }
}

export function changeListElementColor() {

    const oldElementSelected = elem.noteList.querySelector(`.note-selected`);

    if ( oldElementSelected ) {
        elem.noteList.querySelector(`.note-selected`).className = '';
    }

    elem.noteList.querySelector(`#note${actualNoteId}`).className = 'note-selected';
}

export function openNote( id ) { 
    actualNoteId        = id;
    elem.title.textContent   = userNotes.get(actualNoteId)['noteTitle'];
    elem.userNoteInput.value = userNotes.get(actualNoteId)['userNote'];
}