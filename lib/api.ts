import axios from "axios";
import type { NewNoteData, Note, NotesResponse, Tag } from "../types/note";

interface fetchNotesProps {
  debounceQuery: string;
  currentPage: number;
  filterByTag: Tag;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function fetchNotes({
  debounceQuery,
  currentPage,
  filterByTag,
}: fetchNotesProps) {
  // await delay(2000);
  const response = await axios.get<NotesResponse>(`/notes`, {
    params: {
      search: debounceQuery || undefined,
      page: currentPage,
      tag: filterByTag || undefined,
      perPage: 9,
    },
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}
export async function fetchNoteById(id: number) {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}

export async function createNote(noteData: NewNoteData) {
  const response = await axios.post<Note>(`/notes`, noteData, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}

export async function deleteNote(noteId: number) {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}
