import type { LoaderFunctionArgs } from 'react-router-dom';
import { graphQLRequest } from './request';
import type { NoteInput } from '../interfaces/DataTypes';

export const notesLoader = async ({ params: { folderId }}: LoaderFunctionArgs) => {
  const query = `query folderById($folderId: ID!) {
    folderById(id: $folderId) {
      id
      name
      createdAt
      notes {
        id
        content
        updatedAt
      }
    }
  }`;

  const id: number = folderId ? parseInt(folderId) : 0;
  const data = await graphQLRequest({
    query,
    variables: {
     folderId: id
    },
  });

  console.log("notesLoader:", data);
  return data;
};

export const noteDetailLoader = async ({ params: { noteId } }: LoaderFunctionArgs) => {
  const query = `query noteById($noteId: ID!) {
    noteById(id: $noteId) {
      content
      id
      createdAt
      updatedAt
    }
  }`;

  const id: number = noteId ? parseInt(noteId) : 0;
  const data = await graphQLRequest({
    query,
    variables: {
      noteId: id,
    },
  });

  console.log("noteDetailLoader:", data);
  return data;
};

export const addNewNote = async ({ params, request}: LoaderFunctionArgs) => {
  console.log({params});
  console.log({request});

  const newNote = await request.formData();
  // const formDataObj = {};
  // newNote.forEach((value : FormDataEntryValue, key: string) => (formDataObj[key] = value));

  const noteInput: NoteInput = {content: '', authorId: '', folderId: ''};
  // const formDataObj = new Map<string, string>();
  for (const [key, value] of newNote) {
    // formDataObj.set(key, value);
    if (key === 'folderId') noteInput.folderId = value as string;
    if (key === 'authorId') noteInput.authorId = value as string;
    if (key === 'content') noteInput.content = value as string;
  }
  
  console.log({newNote, noteInput});
  const query = `mutation addNote($note: NoteInput!) {
    addNote(note: $note) {
      id
      content
    }
  }`;

  const {addNote} = await graphQLRequest({
    query,
    variables: {
      note: noteInput
    }
  })

  console.log({addNote})
  return addNote;
}

export const updateNote = async ({ params, request}: LoaderFunctionArgs) => {
  console.log({params});
  const updatedNote = await request.formData();
  // const formDataObj = {};
  // updatedNote.forEach((value, key) => (formDataObj[key] = value));
  
  const noteInput: NoteInput = {content: '', authorId: '', folderId: ''};
  const idNote = params.noteId ? parseInt(params.noteId) : 0;
  for (const [key, value] of updatedNote) {
    if (key === 'authorId') noteInput.authorId = value as string;
    if (key === 'content') noteInput.content = value as string;
  }

  console.log({updatedNote, noteInput});
  const query = `mutation updateNote($id: ID!, $note: NoteInput!) {
    updateNote(id: $id, note: $note) {
      id
      content
    }
  }`;

  const {updateNote} = await graphQLRequest({
    query,
    variables: {
      id: idNote,
      note: noteInput
    }
  })

  console.log({updateNote})
  return updateNote;
}