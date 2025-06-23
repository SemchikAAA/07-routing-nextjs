import axios from "axios";
import type { NewNoteData, Note, Tag } from "../types/note";

interface GetNotesResponse {
  notes: Note[];
  totalPages: number;
}
interface fetchNotesProps {
  searchQuery: string;
  currentPage: number;
  sortQuery: Tag;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function fetchNotes({
  searchQuery,
  currentPage,
  sortQuery,
}: fetchNotesProps) {
  await delay(2000);
  const response = await axios.get<GetNotesResponse>(`/notes`, {
    params: {
      search: searchQuery || undefined,
      page: currentPage,
      tag: sortQuery || undefined,
      perPage: 9,
    },
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return response.data;
}
export async function fetchNoteById(id: string) {
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
