import * as  elem  from './modules/notepad-elements.js';
import * as  utils from './modules/notepad-utils.js';



// Change the visibility of the textarea
elem.userNoteInput.style.display = 'none';

elem.btnAdd.addEventListener('click', (e) => {

  if ( !(elem.dialogTitle.style.top == '0px') ) {
    elem.dialogForm.querySelector('label').textContent = 'Set a title :';
    elem.dialogTitle.id = 'set-title'; // To know if the event set a title or event update a title

    utils.showModal('-600px', '0px'); 
  }
});

elem.dialogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput  = elem.dialogForm.querySelector('input').value;
  let dialogId      = elem.dialogTitle.id;

  if ( dialogId == 'update-title' &&  titleInput.length > 0) { // Update title
    
    const targetElement = document.querySelector(`#note${utils.actualNoteId}`);
    const titleToChange = targetElement.querySelector('.list-title');

    utils.userNotes.set( utils.actualNoteId, {
      noteTitle: titleInput,
      userNote:  elem.userNoteInput.value
    });

    elem.title.textContent         = titleInput;
    titleToChange.textContent      = titleInput;

    elem.dialogForm.querySelector('input').value = '';
    utils.showModal('0px', '-600px');

    e.preventDefault();
  }


  if ( dialogId == 'set-title' && titleInput.length > 0) {
    elem.title.textContent = titleInput;

    utils.setNewNote( titleInput );
    utils.addElementToList( titleInput, utils.getLocalDate() );
    utils.showModal('0px', '-600px');

    elem.dialogForm.querySelector('input').value = '';
    elem.userNoteInput.value = '';
    elem.userNoteInput.style.display = '';
  } 
});

elem.dialogTitle.querySelector('.btn-cancel').addEventListener('click', () => {
  elem.dialogForm.querySelector('input').value = '';
  utils.showModal('0px', '-600px');

});

elem.noteList.addEventListener( 'click', (e) => {

  if ( e.target.nodeName == 'LI' ) {

    utils.openNote( Number( e.target.id.replace('note', '') ) );
    utils.changeListElementColor();
    elem.userNoteInput.style.display = '';

  } else if ( e.target.parentElement.nodeName == 'LI' ) {

    utils.openNote( Number( e.target.parentElement.id.replace('note', '') ) );
    utils.changeListElementColor();
    elem.userNoteInput.style.display = '';
  }
});

elem.userNoteInput.addEventListener('keyup', (e) => {
  
  utils.userNotes.set( utils.actualNoteId, {
    noteTitle: elem.title.textContent,
    userNote:  elem.userNoteInput.value
  })

});

elem.userNoteInput.addEventListener('keydown', (e) => {
  let code = e.keyCode || e.which;
  
  if ( code === 9 ) { // Tab keypress event
    e.preventDefault()
    elem.userNoteInput.value += '   ';
  }
});

elem.btnEdit.addEventListener( 'click', () => {

  if ( !(elem.dialogTitle.style.top == '0px') && !(utils.nbOfNotes == 0)) {
      elem.dialogForm.querySelector('label').textContent = 'Set a new title :';
      elem.dialogTitle.id = 'update-title';
      utils.showModal('-600px', '0px');
  } 
});

elem.btnDelete.addEventListener( 'click', () => {
  utils.removeNote( utils.actualNoteId );
});
