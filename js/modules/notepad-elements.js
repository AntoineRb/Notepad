export const notePadContainer = document.querySelector( '.notepad-container' );

// Aside
export const noteListSection  = notePadContainer.querySelector( '.note-list-block' );
export const noteList         = noteListSection.querySelector( '.note-list' );
export const listTopBar       = noteListSection.querySelector( '.list-top-bar' );

export const btnAdd    = listTopBar.querySelector( '.btn-add'  );
export const btnEdit   = listTopBar.querySelector( '.btn-edit' );
export const btnDelete = listTopBar.querySelector( '.btn-delete' );

// Article
export const noteContainer = notePadContainer.querySelector( '.note-container' );
export const title         = noteContainer.querySelector('header').querySelector('h1');
export const userNoteInput = noteContainer.querySelector('.user-note-input');

export const dialogTitle   = noteContainer.querySelector('.modal-choose-title');
export const dialogForm    = dialogTitle.querySelector('form');