import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const debounceQuery = "";
  const currentPage = 1;
  const filterByTag = "Personal";

  const notesData = await fetchNotes({
    debounceQuery,
    currentPage,
    filterByTag,
  });

  return (
    <div>
      <NotesClient
        initialData={notesData}
        initialQuery={{
          debounceQuery,
          currentPage,
          filterByTag,
        }}
      />
    </div>
  );
}
