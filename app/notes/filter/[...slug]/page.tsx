import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const tagQuery = slug[0] === "all" ? "" : slug[0];

  const debounceQuery = "";
  const currentPage = 1;

  const notesData = await fetchNotes({
    debounceQuery,
    currentPage,
    tagQuery,
  });

  return (
    <div>
      <NotesClient
        tagQuery={tagQuery}
        initialData={notesData}
        initialQuery={{
          debounceQuery,
          currentPage,
        }}
      />
    </div>
  );
}
