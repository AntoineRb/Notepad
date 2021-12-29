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

// Change the visibility of the textarea
// textArea.style.display = 'none';



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

// Il faut ajouter les instructions pour sauvegarder les valeurs
dialogTitle.addEventListener('submit', (e) => {
  
  e.preventDefault();
  showModal('0px', '-600px');
  
});
dialogTitle.querySelector('.btn-abort').addEventListener('click', () => {

  showModal('0px', '-600px');
});

